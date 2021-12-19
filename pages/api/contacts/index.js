import nc from 'next-connect';
import Contact from '../../../models/Contact';
import db from '../../../utils/db';
import { onError } from '../../../utils/error.js';

const handler = nc({
  onError,
});

handler.post(async (req, res) => {
  await db.connect();

  const newContact = new Contact({
    ...req.body,
  });

  await newContact.save();

  res.status(201).send(newContact);
});
export default handler;
