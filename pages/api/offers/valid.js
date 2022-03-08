import nc from 'next-connect';
import Offer from '../../../models/Offer';
import db from '../../../utils/db';

const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  const offer = await Offer.find({
    $and: [
      { startDate: { $lte: new Date() } },
      { endDate: { $gte: new Date() } },
    ],
  });

  await db.disconnect();
  res.status(200).send({ validOffer: offer });
});

export default handler;
