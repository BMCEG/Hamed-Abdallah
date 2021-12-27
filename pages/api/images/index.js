import nextConnect from 'next-connect';
import multer from 'multer';
import aws from 'aws-sdk';

const s3 = new aws.S3({
  endpoint: 'fra1.digitaloceanspaces.com',
  accessKeyId: process.env.SPACES_ACCESS_KEY,
  secretAccessKey: process.env.SPACES_SECRET_KEY,
});

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const upload = s3.upload(
  {
    Bucket: 'images-upload',
    ACL: 'public-read', // Specify whether anyone with link can access the file
    Key: `${fields.id}/${files.file.name}`, // Specify folder and file name
    Body: file,
  },
  {
    partSize: 10 * 1024 * 1024,
    queueSize: 10,
  }
);

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.log('err', error.message);
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
apiRoute.use(upload.single('image'));

apiRoute.post((req, res) => {
  res.status(200).json({ filename: req.file.filename });
});

export default apiRoute;
