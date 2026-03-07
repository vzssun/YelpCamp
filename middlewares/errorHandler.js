const appError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

const errorHandler = (err, req, res, next) => {
  const error = appError(err.message || 'Something went wrong', err.statusCode || 500);
  res.status(error.statusCode || 500).render('error', { error });
};

export default errorHandler;