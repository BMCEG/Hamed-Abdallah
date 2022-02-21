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
    // let imagesArr = [];
    const form = new formidable.IncomingForm();
    form.uploadDir = './';
    form.multiples = true;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err || !fields.id) return res.status(500);

      await getResult(files, fields).then((response) => {
        // imagesArr = response;
        res.status(200).send({ imagesArr: response });
      });
    });
  } catch (error) {
    res.status(401);
  }
});

export default handler;

const getResult = async (files, fields) => {
  let imagesLocations = new Array();
  for (let i = 0; i < files.files.length; i++) {
    const file = fs.readFileSync(files.files[i].path);

    const stored = await s3
      .upload(
        {
          Bucket: 'images-uploads',
          ACL: 'public-read',
          Key: `${fields.id}/${files.files[i].name}`,
          Body: file,
        },
        {
          partSize: 10 * 1024 * 1024,
          queueSize: 10,
        }
      )
      .promise();
    imagesLocations.push(stored.Location);
  }
  return imagesLocations;
};
