import nc from 'next-connect';
import Offer from '../../../models/Offer';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();

  const newOffer = new Offer({
    ...req.body,
  });

  await newOffer.save();

  res.status(201).send(newOffer);
});
export default handler;
