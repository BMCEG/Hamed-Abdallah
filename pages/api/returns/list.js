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
  await db.disconnect();
  res.send(returns);
});
export default handler;
