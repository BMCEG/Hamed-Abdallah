import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
import Order from '../../../../models/Order';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const { orderID } = req.body;

  try {
    await db.connect();
    const order = await Order.findById({ _id: orderID });

    const initIsPaid = order.isPaid;
    order.isPaid = !initIsPaid;

    order.paitAt = Date.now();

    await order.save();

    await db.disconnect();

    res.status(200).send(order);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
