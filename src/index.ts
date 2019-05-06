import './env';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import flash from 'express-flash';

import photoRouter from './routes/photoRouter';
import statRouter from './routes/statRouter';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());

app.use('/v1/photos', photoRouter);
app.use('/v1/stats', statRouter);

const handleListening = () =>
  console.log(`✅ Listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
