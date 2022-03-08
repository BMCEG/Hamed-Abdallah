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
  await sendMail();

  res.status(201).send(newContact);
});
export default handler;

const sendMail = async (payload) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.mail.yahoo.com',
    port: 587,
    secure: false,
    service: 'yahoo',
    logger: true,
    auth: {
      user: 'ali_moneib@yahoo.com',
      pass: 'wjxmqjxmmnlpbupm',
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hamed Abdallah Optics 👓" <ali_moneib@yahoo.com>', // sender address
    to: 'AhmadWagdy108@gmail.com, ali.moneib@gmail.com, mohamed@bmceg.com', // list of receivers
    subject: 'A user has sent a contact message', // Subject line
    text: 'New Contact Message has been sent. Login to admin panel and check it out', // plain text body
    html: `<b>New Contact Message has been sent. Login to admin panel and check it out at http://www.hamedabdallah.com/admin/contacts</b>`, // html body
  });
};
