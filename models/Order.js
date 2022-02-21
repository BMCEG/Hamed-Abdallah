import mongoose from 'mongoose';

const subSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  note: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shortID: {
      type: String,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    status: {
      type: String,
      enum: [
        'pending',
        'processing',
        'shipping',
        'delivered',
        'returnPending',
        'returned',
      ],
      default: 'pending',
    },
    shippingAddress: {
      fullName: {
        type: String,
        required: true,
      },
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        required: true,
      },
      landmark: {
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
    itemsPrice: {
      type: Number,
      required: true,
    },
    shippingPrice: {
      type: Number,
      required: true,
    },
    vat: {
      type: Number,
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    notes: [subSchema],
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
