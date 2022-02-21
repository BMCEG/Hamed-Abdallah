import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
// import middleware from '../../../../middlewares/upload';
import Brand from '../../../../models/Brand';

const handler = nc({
  onError,
});

// handler.use(middleware);
// handler.use(isAuth);

handler.post(async (req, res) => {
  const { name, logo } = req.body;
  await db.connect();
  try {
    // const brand = await Brand.findById({ _id: orderId });
    const newBrand = new Brand({
      name,
      logo,
    });
    await newBrand.save();

    res.status(201).send(newBrand);
    // res.status(201);
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: error });
  }
});

export default handler;
