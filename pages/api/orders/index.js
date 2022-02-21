import nc from 'next-connect';
import Order from '../../../models/Order';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';
import { isAuth } from '../../../utils/auth.js';
import Product from '../../../models/Product';
import { customAlphabet } from 'nanoid';
import nodemailer from 'nodemailer';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  try {
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

    await sendMail(order._id);

    res.status(201).send(order);
  } catch (err) {
    res.status(400).send(err);
  }
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

const sendMail = async (payload) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    secure: false,
    service: 'yahoo',
    logger: true,
    auth: {
      user: 'ali_moneib@yahoo.com',
      pass: 'wjxmqjxmmnlpbupm',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hamed Abdallah Optics 👓" <ali_moneib@yahoo.com>', // sender address
    to: 'AhmadWagdy108@gmail.com, ali.moneib@gmail.com, mohamed@bmceg.com', // list of receivers
    subject: 'New Order from Hamed Abdallah Website', // Subject line
    text: 'New Order has been placed. Login to admin panel and check it out', // plain text body
    html: `<b>New Order has been placed. Login to admin panel and check it out at http://www.hamedabdallah.com/order/${payload}</b>`, // html body
  });
};
