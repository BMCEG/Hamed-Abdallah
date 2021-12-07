import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import db from '../../../utils/db';
import { signToken } from '../../../utils/auth';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const { name, email, password, mobile } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const newUser = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
  });

  // const existingEmail = await User.find({ email: email });
  // if (existingEmail) {
  //   res
  //     .status(401)
  //     .send({
  //       message: 'E-Mail is already in use. Please try a different one.',
  //     });
  // }

  await newUser.save();

  await db.disconnect();

  if (newUser) {
    const token = signToken(newUser);
    res.send({
      token,
      _id: newUser._id,
      name: newUser.name,
      mobile: newUser.mobile,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid Email or Password' });
  }
});

export default handler;
