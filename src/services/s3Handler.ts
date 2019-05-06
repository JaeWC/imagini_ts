import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.S3_BUCKET_REGION
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'thumbnail-bucket-imagini-node',
    acl: 'public-read',
    metadata: (req, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (req, file, cb) => {
      cb(null, `${Date.now().toString()}_${file.originalname}`);
    }
  })
});

const deleteItem = imageName =>
  s3.deleteObject(
    { Bucket: 'thumbnail-bucket-imagini-node', Key: imageName },
    (err, data) => {
      if (err) console.log(err, err.stack);
      else console.log(data);
    }
  );

export default { upload, deleteItem };
