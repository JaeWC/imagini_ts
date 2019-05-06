import express from 'express';
import imageParam from '../middlewares/imageParam';
import photoController from '../controllers/photoController';
import s3Handler from '../services/s3Handler';

const singleUpload = s3Handler.upload.single('image');

const photoRouter = express.Router();

photoRouter.param('image', imageParam);

photoRouter.get('/:image', photoController.getPhoto);

photoRouter.post('/upload/:name', singleUpload, photoController.uploadPhoto);

photoRouter.delete('/delete/:image', photoController.deletePhoto);

export default photoRouter;
