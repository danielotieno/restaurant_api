import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';

// Load env files
dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes(app);

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`,
  ),
);
