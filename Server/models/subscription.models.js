import mongoose from 'mongoose';


const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    platformName: {
        type: String,
        required: true,
        trim: true,
        // Your capitalization logic is great!
        set: v => v && typeof v === 'string'
            ? v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
            : v
    },
    price: {
        amount: {
            type: Number,
            required: true,
            min: 0
        },
        currency: {
            type: String,
            required: true,
            enum: ['USD', 'EUR', 'INR', 'GBP', 'JPY'],
            default: 'INR'
        },
    },
    billingCycle: {
        type: String,
        required: true,
        enum: ['Weekly', 'Monthly', 'Quarterly', 'Yearly'],
        default: 'Monthly'
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    nextBillingDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Cancelled', 'Paused', 'Expired'],
        default: 'Active'
    },
    category: {
        type: String,
        trim: true,
        default: 'Other'
    },
}, {
    timestamps: true
});


subscriptionSchema.pre('save', function (next) {

    if (this.isNew || this.isModified('startDate') || this.isModified('billingCycle')) {

        const calculateNextDate = (startDate, cycle) => {
            const date = new Date(startDate);
            switch (cycle) {
                case 'Weekly':
                    date.setDate(date.getDate() + 7);
                    break;
                case 'Monthly':
                    date.setMonth(date.getMonth() + 1);
                    break;
                case 'Quarterly':
                    date.setMonth(date.getMonth() + 3);
                    break;
                case 'Yearly':
                    date.setFullYear(date.getFullYear() + 1);
                    break;
                default:
                    date.setMonth(date.getMonth() + 1);
            }
            return date;
        };


        this.nextBillingDate = calculateNextDate(this.startDate, this.billingCycle);
    }
    next();
});

subscriptionSchema.methods.markAsPaid = async function (paidDate = null) {
    const calculateNextDate = (date, cycle) => {
        const next = new Date(date);
        switch (cycle) {
            case 'Weekly': next.setDate(next.getDate() + 7); break;
            case 'Monthly': next.setMonth(next.getMonth() + 1); break;
            case 'Quarterly': next.setMonth(next.getMonth() + 3); break;
            case 'Yearly': next.setFullYear(next.getFullYear() + 1); break;
            default: next.setMonth(next.getMonth() + 1);
        }
        return next;
    };

    const effectiveDate = paidDate ? new Date(paidDate) : new Date();

    this.startDate = effectiveDate;
    this.nextBillingDate = calculateNextDate(effectiveDate, this.billingCycle);

    return await this.save(); 
};




export const Subscription = mongoose.model('Subscription', subscriptionSchema);