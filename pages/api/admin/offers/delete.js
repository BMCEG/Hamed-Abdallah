import nc from 'next-connect';
import Offer from '../../../../models/Offer.js';
import db from '../../../../utils/db.js';
const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  try {
    const offer = await Offer.deleteOne({ _id: req.body._id });

    await db.disconnect();
    res.status(200).send({ message: 'Offer has been deleted successfully' });
  } catch (error) {
    res.status(401).send({ message: error });
  }
});

export default handler;
