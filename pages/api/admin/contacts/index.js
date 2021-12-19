import nc from 'next-connect';
import db from '../../../../utils/db';
import { onError } from '../../../../utils/error.js';
import { isAuth } from '../../../../utils/auth.js';
import User from '../../../../models/User';

const handler = nc({
  onError,
});

handler.use(isAuth);

handler.post(async (req, res) => {
  const { userID } = req.body;

  try {
    await db.connect();
    const user = await User.findById({ _id: userID });

    if (user.isAdmin === true) {
      user.isAdmin = false;
    } else {
      user.isAdmin = true;
    }

    await user.save();

    await db.disconnect();

    res.status(200).send(user);
  } catch (error) {
    res.status(401).send({
      message: error,
    });
  }
});

export default handler;
