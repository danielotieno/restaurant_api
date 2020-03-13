import logger from 'fancy-log';

import ErrorResponse from '../utils/errorResponse';

const errorHanlder = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for developer
  logger.info(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose Dublicate Key
  if (err.code === 11000) {
    const message = 'Cannot create same resource twice';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose Validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

export default errorHanlder;
