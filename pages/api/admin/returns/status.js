import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
import Return from '../../../../models/Return';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const { returnID } = req.body;

  try {
    await db.connect();
    const returnObj = await Return.findById({ _id: returnID });

    if (returnObj.returnStatus === 'pending') {
      returnObj.returnStatus = 'returned';
    } else {
      returnObj.returnStatus = 'pending';
    }

    await returnObj.save();

    await db.disconnect();

    res.status(200).send(returnObj);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
