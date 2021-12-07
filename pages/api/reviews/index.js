import nc from 'next-connect';
import Product from '../../../models/Product';
import User from '../../../models/User';
import Review from '../../../models/Reviews';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const { userInfo, product, review, rating } = req.body;
  await db.connect();
  const user = await User.findById({ _id: userInfo._id });
  const reviewedProduct = await Product.findById({ _id: product._id });
  try {
    const newReview = new Review({
      user: user._id,
      product: product._id,
      review,
      rating,
    });
    await newReview.save();

    const sum = reviewedProduct.avgRating + rating;
    const newNumOfRatings = reviewedProduct.numOfRatings + 1;

    reviewedProduct.avgRating = sum / newNumOfRatings;
    reviewedProduct.numOfRatings = newNumOfRatings;
    await reviewedProduct.save();

    res.status(201).send(review);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});
export default handler;
