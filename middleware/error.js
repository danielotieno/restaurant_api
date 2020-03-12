import logger from 'fancy-log';

import ErrorResponse from '../utils/errorResponse';

const errorHanlder = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for developer
  logger.info(err.stack);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  res.status(error.statusCode).json({
    success: false,
    error: error.message,
  });
};

export default errorHanlder;
