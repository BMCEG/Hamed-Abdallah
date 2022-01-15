import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    nameAR: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
    },
    descriptionAR: {
      type: String,
    },
    sku: {
      type: String,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand',
    },
    brandName: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    color: {
      type: String,
      enum: [
        'beige',
        'black',
        'brown',
        'blue',
        'gold',
        'grey',
        'hazel',
        'light-blue',
        'pink',
        'purple',
        'red',
        'silver',
        'transparent',
        'white',
        'yellow',
        'other',
      ],
    },
    material: {
      type: String,
      enum: ['plastic', 'metal', 'plastic/metal'],
    },
    shape: {
      type: String,
      enum: [
        'cat-eye',
        'oval',
        'rectangle',
        'round',
        'sport',
        'mask',
        'square',
        'other',
      ],
    },
    gender: {
      type: String,
      enum: ['unisex', 'male', 'female', 'kids'],
    },
    type: {
      type: String,
      enum: ['sunglasses', 'eyeglasses'],
    },
    stock: {
      type: Number,
    },
    price: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
      default: 0,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
    numOfRatings: {
      type: Number,
      default: 0,
    },
    featuredImage: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
