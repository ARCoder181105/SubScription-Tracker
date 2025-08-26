import jwt from 'jsonwebtoken'
import { User } from '../Models/user.models.js'
import { ApiError } from '../utils/ApiError.js'

export const authenticateJWT = async (req, _, next) => {

    try {
        const { acessToken } = req.cookies;

        if (!acessToken) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(acessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
}

