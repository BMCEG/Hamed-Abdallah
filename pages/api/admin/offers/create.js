import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
// import middleware from '../../../../middlewares/upload';
import Offer from '../../../../models/Offer';

const handler = nc({
  onError,
});

// handler.use(middleware);
// handler.use(isAuth);

handler.post(async (req, res) => {
  const { name, value, startDate, endDate } = req.body;

  await db.connect();

  try {
    const newOffer = new Offer({
      name,
      value,
      startDate,
      endDate,
    });
    await newOffer.save();

    res.status(201).send(newOffer);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});

export default handler;
