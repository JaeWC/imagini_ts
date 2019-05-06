import express from 'express';
import statController from '../controllers/statController';

const statRouter = express.Router();

statRouter.get('/', statController.getStats);

export default statRouter;
