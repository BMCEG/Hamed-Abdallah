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
        'blue',
        'gold',
        'grey',
        'light-blue',
        'pink',
        'purple',
        'red',
        'silver',
        'white',
        'yellow',
        'other',
      ],
    },
    material: {
      type: String,
      enum: ['plastic', 'metal', 'titanium', 'other'],
    },
    shape: {
      type: String,
      enum: ['cat-eye', 'oval', 'rectangle', 'round', 'square', 'other'],
    },
    gender: {
      type: String,
      enum: ['girls', 'male', 'female', 'boys'],
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
