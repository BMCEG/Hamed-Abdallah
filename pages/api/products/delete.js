import nc from 'next-connect';
import Product from '../../../models/Product';
import Reviews from '../../../models/Reviews';
import db from '../../../utils/db';
import reviews from '../../reviews';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const product = await Product.deleteOne({ _id: req.body._id });
  const reviews = await Reviews.find({});

  reviews.map(async (review) => {
    if (review.product.toString() === req.body._id) {
      await Reviews.deleteOne({ _id: review._id });
    }
  });
  await db.disconnect();
  res.status(200).send({ message: 'Product has been deleted successfully' });
});

export default handler;
