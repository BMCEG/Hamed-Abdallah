import nc from 'next-connect';
import User from '../../../../models/User';
import db from '../../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.userInfo.email });

  const existingWishlistItem = user.wishlist.some(function (el) {
    console.log(el._id.toString());
    return el._id.toString() === req.body.data._id;
  });

  if (existingWishlistItem) {
    res.status(401).send({
      message: 'Item is already in wishlist.',
    });
  }

  user.wishlist.push(req.body.data._id);
  await user.save();

  await db.disconnect();

  res.send(user);
});

export default handler;
