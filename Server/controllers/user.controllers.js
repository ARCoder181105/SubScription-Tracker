import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Subscription } from '../models/subscription.models.js'

export const getUserSubscriptions = async (req, res, next) => {
    try {
        const userId = req.user._id; // comes from authenticateJWT

        const subscriptions = await Subscription.find({ userId })
            .sort({ nextBillingDate: 1 })
            .lean();

        if (!subscriptions || subscriptions.length === 0) {
            throw new ApiError(404, "No subscriptions found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, subscriptions, "Subscriptions fetched successfully"));
    } catch (error) {
        next(error);
    }
};

export const addUserSubscriptions = async (req, res, next) => {
    try {

        const { _id: userId } = req.user;

        const {
            platformName,
            price, // Expect a price object { amount, currency }
            billingCycle,
            startDate,
            status,
            category,
            reminderDaysBefore,
        } = req.body;

        // Basic validation to ensure required fields are present
        if (!platformName || !price || !billingCycle || !startDate) {
            throw new ApiError(400, "Required Fields not filled");
        }

        const parsedStartDate = new Date(startDate);
        if (isNaN(parsedStartDate)) {
            throw new ApiError(400, "Invalid startDate");
        }

        // Create a new subscription instance
        const newSubscription = new Subscription({
            userId,
            platformName,
            price: {
                amount: price.amount,
                currency: price.currency
            },
            billingCycle,
            startDate: parsedStartDate,
            status, // If not provided, the default 'Active' will be used
            category, // If not provided, the default 'Other' will be used
            reminderDaysBefore // If not provided, the default '3' will be used
        });

        // Save the new subscription to the database
        const savedSubscription = await newSubscription.save();

        res.status(200)
            .json(
                new ApiResponse(200, {
                    data: savedSubscription
                }
                    , "Subscription Saved Sucessfully")
            )

    } catch (error) {
        console.log("Unable to add the data to DB ", error);
        next(error);
    }
};

