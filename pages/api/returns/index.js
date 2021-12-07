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
  const { userInfo, orderId, returnType } = req.body;
  await db.connect();
  try {
    const order = await Order.findById({ _id: orderId });

    const newReturn = new Return({
      user: userInfo._id,
      order: orderId,
      returnType,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      itemsPrice: order.itemsPrice,
    });

    await newReturn.save();
    res.status(201).send(newReturn);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});
export default handler;
