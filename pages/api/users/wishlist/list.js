import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
import User from '../../../../models/User';
import Product from '../../../../models/Product';
import Brand from '../../../../models/Brand';
const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  let wishlist = [];

  const user = await User.findById({ _id: req.user._id });

  for (let i = 0; i < user.wishlist.length; i++) {
    let x = await Product.findById({ _id: user.wishlist[i] }).populate('brand');
    wishlist.push(x);
  }
  await db.disconnect();
  res.send(wishlist);
});
export default handler;
