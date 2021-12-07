import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const product = await Product.deleteOne({ _id: req.body._id });
  await db.disconnect();
  res.status(200).send({ message: 'Product has been deleted successfully' });
});

export default handler;
