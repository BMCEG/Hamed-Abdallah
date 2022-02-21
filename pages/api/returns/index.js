import nc from 'next-connect';
import Order from '../../../models/Order';
import Return from '../../../models/Return';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const { userInfo, orderId } = req.body;
  await db.connect();
  try {
    const order = await Order.findById({ _id: orderId });
    order.status = 'returnPending';
    await order.save();

    res.status(201).send(order);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});
export default handler;
