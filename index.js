import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import logger from 'fancy-log';
import routes from './routes';

// Load env files
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dev logging middleware
if (process.env.NODE_ENV === 'developemnt') {
  app.use(morgan('dev'));
}

routes(app);

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  logger.info(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`,
  ),
);
