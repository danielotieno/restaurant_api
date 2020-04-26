import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from 'fancy-log';
import fileupload from 'express-fileupload';

import connectDB from './config/db';
import routes from './routes';

// Load env files
dotenv.config({ path: './config/config.env' });

// Connect Database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'developemnt') {
  app.use(morgan('dev'));
}

// File Upload
app.use(fileupload());

// Set Static folder
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`,
  ),
);
