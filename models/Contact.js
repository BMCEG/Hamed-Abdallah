import mongoose from 'mongoose';

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    message: {
      type: String,
    },
    mobile: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;
