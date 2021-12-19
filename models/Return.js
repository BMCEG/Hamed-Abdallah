import mongoose from 'mongoose';

const returnSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    returnStatus: {
      type: String,
      enum: ['pending', 'returned'],
      default: 'pending',
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    isReturned: {
      type: Boolean,
      required: true,
      default: false,
    },
    itemsPrice: {
      type: Number,
    },
    itemPrice: {
      type: Number,
    },
    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Return = mongoose.models.Return || mongoose.model('Return', returnSchema);

export default Return;
