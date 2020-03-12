import logger from 'fancy-log';

const errorHanlder = (err, req, res, next) => {
  // Log to console for developer
  logger.info(err.stack);

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

export default errorHanlder;
