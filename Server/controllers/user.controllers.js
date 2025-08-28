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
        console.log("Unable to update subscription list", error);
        if (error instanceof ApiError) {
            next(error);
        } else {
            next(new ApiError(500, "An unexpected error occurred while fetching subscriptions"));
        }
    }
};

export const getUserSubscriptionById = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { id: subscriptionId } = req.params;

        if (!subscriptionId || !userId) {
            throw new ApiError(400, "Missing subscriptionId or userId");
        }

        const subscription = await Subscription.findById(subscriptionId);


        if (!subscription) {
            throw new ApiError(404, "Subscription not found");
        }

        if (subscription.userId.toString !== userId.toString()) {
            throw new ApiError(404, "Invalid acesss");
        }

        res.status(200)
            .json(
                new ApiResponse(200, { subscription: subscription }, "Subscription fetched successfully")
            );
    } catch (error) {
        console.log("Error in fetching the data", error);
        next(new ApiError(404, "Error in fetching the data"));
    }

}

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
        next(new ApiError(404, "Unable to add the data to DB "));
    }
};

export const editUserSubscription = async (req, res, next) => {
    try {

        const { id: subscriptionId } = req.params;
        const { _id: userId } = req.user;

        const updateData = req.body;

        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            throw new ApiError(404, 'Subscription not found.')
        }


        if (subscription.userId.toString() !== userId.toString()) {
            throw new ApiError(403, 'Forbidden: You do not have permission to edit this subscription.')
        }

        Object.keys(updateData).forEach(key => {
            if (key === 'price' && typeof updateData.price === 'object') {
                subscription.price = { ...subscription.price, ...updateData.price };
            } else {
                subscription[key] = updateData[key];
            }
        });

        const updatedSubscription = await subscription.save();

        res.status(200)
            .json(new ApiResponse(200, { subscription: updatedSubscription }, "Subscription updated sucessfully"));

    } catch (error) {
        console.error("Error updating subscription: ", error);
        next(new ApiError(404, "Error updating subscription: "));
    }
};

export const deleteUserSubscription = async (req, res, next) => {
    try {
        const { _id: userId } = req.user;
        const { id: subscriptionId } = req.params;

        if (!subscriptionId || !userId) {
            throw new ApiError(400, "Missing subscriptionId or userId");
        }

        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            throw new ApiError(404, "Subscription not found");
        }

        if (subscription.userId.toString() !== userId.toString()) {
            throw new ApiError(403, "Forbidden: You do not have permission to delete this subscription.");
        }

        await Subscription.deleteOne({ _id: subscriptionId });

        res.status(200).json(
            new ApiResponse(200, null, "Subscription deleted successfully")
        );
    } catch (error) {
        console.log("Unable to delete the user ", error)
        next(new ApiError(404, "Unable to delete the user "));
    }
};

export const markSubsCriptionAsDone = async (req, res, next) => {
    try {
        const { id: subscriptionId, paidDate } = req.params;
        const { _id: userId } = req.user;

        if (!subscriptionId || !userId) {
            throw new ApiError(400, "Missing subscriptionId or userId");
        }

        const subscription = await Subscription.findById(subscriptionId);

        if (!subscription) {
            throw new ApiError(404, "Subscription not found");
        }

        await subscription.markAsPaid(paidDate);

        res.status(200).json(
            new ApiResponse(200, { subscription }, "Subscription marked as paid successfully")
        );
    } catch (error) {
        console.error("Error marking subscription as paid: ", error);
        next(new ApiError(500, "Error marking subscription as paid"));
    }
};