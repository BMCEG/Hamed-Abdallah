import nc from 'next-connect';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';
import Return from '../../../models/Return';
import Order from '../../../models/Order';
const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  let returns = await Return.find({ user: req.user._id }).populate('order');
  returns = returns.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  await db.disconnect();
  res.send(returns);
});
export default handler;
