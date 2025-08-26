import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const DEFAULT_AVATAR = "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png";



const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


export const registerUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        if ([email, username, password].some((field) => !field || field.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const existedUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists");
        }

        let avatarUrl = DEFAULT_AVATAR;
        if (req.file?.path) {
            const uploaded = await uploadOnCloudinary(req.file.path);
            if (uploaded?.secure_url) {
                avatarUrl = uploaded.secure_url;
            }
        }

        const user = new User({
            username,
            email,
            password,
            avatar: avatarUrl,
        });

        await user.save();

        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true
        }

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        return res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(201, {
                    user: createdUser, accessToken, refreshToken
                }, "User registered successfully")
            );

    } catch (error) {
        console.error("Register error:", error);
        next(error);
    }
};
