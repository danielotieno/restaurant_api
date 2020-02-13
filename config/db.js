import mongoose from 'mongoose';
import logger from 'fancy-log';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger.info(`Database Connected at: ${conn.connection.host}`);
  } catch (error) {
    logger.info(error.message);
    process.exit(1);
  }
};

export default connectDB;
