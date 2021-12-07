import mongoose from 'mongoose';

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    nameAR: {
      type: String,
    },
    logo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema);

export default Brand;
