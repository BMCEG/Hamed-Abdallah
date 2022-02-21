import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();

  let allOrders = await Order.find({ user: req.user._id });

  let orders = allOrders.filter((order) => {
    return order.status !== 'returned' && order.status !== 'returnPending'
  });

  orders = orders.sort(function (a, b) {
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  res.send(orders);
});
export default handler;
