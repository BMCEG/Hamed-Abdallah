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
  const { orderID, note, userInfo } = req.body;
  try {
    await db.connect();
    const order = await Order.findById({ _id: orderID });

    order.notes.push({
      author: userInfo.name,
      note,
      date: Date.now(),
    });

    await order.save();

    await db.disconnect();

    res.status(200).send(order);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
