import express from 'express';
import dotenv from 'dotenv';

// Load env files
dotenv.config({ path: './config/config.env' });

const app = express();

const PORT = process.env.PORT || 7000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
  )
);
