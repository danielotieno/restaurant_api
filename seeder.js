import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from 'fancy-log';

// Load models
import Restaurant from './models/Restaurant';

// Load env variables
dotenv.config({ path: './config/config.env' });

// connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Read JSON files
const restaurants = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/restaurants.json`, 'utf-8'),
);

// Import Data into database
const importData = async () => {
  try {
    await Restaurant.create(restaurants);
    logger.info('Data Imported Successfully');
    process.exit();
  } catch (error) {
    logger.info(error);
  }
};

// Delete the data from database
const deleteData = async () => {
  try {
    await Restaurant.deleteMany();
    logger.info('Data Destroyed Successfully');
    process.exit();
  } catch (error) {
    logger.info(error);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
