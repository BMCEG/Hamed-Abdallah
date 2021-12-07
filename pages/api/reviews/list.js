import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';
import Review from '../../../models/Reviews';
const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  let reviews = await Review.find({ user: req.user._id }).populate('product');
  await db.disconnect();
  res.send(reviews);
});
export default handler;
