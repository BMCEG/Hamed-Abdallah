import nextConnect from 'next-connect';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: `./public/uploads`,
    filename: (req, file, cb) => {
      const newFileName = `${Date.now()}_${file.originalname.replace(
        /\s+/g,
        '-'
      )}`;
      cb(null, newFileName);
    },
  }),
});

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
