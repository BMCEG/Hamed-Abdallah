import aws from 'aws-sdk';
import formidable from 'formidable-serverless';
import nextConnect from 'next-connect';
import { onError } from '../../../utils/error.js';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
const spacesEndpoint = new aws.Endpoint('fra1.digitaloceanspaces.com');

const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
});
const handler = nextConnect({
  onError,
});

handler.post(async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.uploadDir = './';
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
      if (err || !fields.id) return res.status(500);
      // Read file
      const file = fs.readFileSync(files.file.path);

      s3.upload(
        {
          Bucket: 'images-uploads', // Add bucket name here
          ACL: 'public-read', // Specify whether anyone with link can access the file
          Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
          Body: file,
        },
        {
          partSize: 10 * 1024 * 1024,
          queueSize: 10,
        }
      ).send((err, data) => {
        if (err) return res.status(500);
        // Unlink file
        fs.unlinkSync(files.file.path);
        // Return file url or other necessary details
        return res.send({
          url: data.Location,
        });
      });
    });
  } catch (error) {
    res.status(401);
  }
});

export default handler;
