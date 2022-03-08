import mongoose from 'mongoose';

const offerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    startDate:{
      type: Date,
      required: true
    },
    endDate:{
      type: Date,
      required: true
    }

  },
  {
    timestamps: true,
  }
);

const Offer = mongoose.models.Offer || mongoose.model('Offer', offerSchema);

export default Offer;
 