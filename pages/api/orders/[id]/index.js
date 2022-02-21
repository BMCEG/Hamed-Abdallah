import nc from 'next-connect';
import Order from '../../../../models/Order';
import Product from '../../../../models/Product';
import db from '../../../../utils/db';
import { isAuth } from '../../../../utils/auth';

const handler = nc();
handler.use(isAuth);
handler.get(async (req, res) => {
  await db.connect();
  const order = await Order.findOne({ _id: req.query.id }).populate(
    'orderItems'
  );
  await db.disconnect();
  res.send(order);
});

export default handler;
