import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';
import Product from '../../../models/Product';
import { customAlphabet } from 'nanoid';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  await db.connect();

  const shortID = await createShortID();

  const newOrder = new Order({
    ...req.body,
    shortID,
    user: req.user._id,
  });

  const order = await newOrder.save();

  req.body.orderItems.map(async (prod) => {
    let product = await Product.findById({ _id: prod._id });
    product.stock = product.stock - prod.quantity;
    await product.save();
  });

  res.status(201).send(order);
});
export default handler;

const createShortID = async () => {
  const nanoid = customAlphabet('1234567890', 7);
  const shortID = nanoid();

  const existingOrder = await Order.find({ shortID: shortID });
  if (existingOrder.length === 0) {
    return shortID;
  } else {
    return createShortID();
  }
};
