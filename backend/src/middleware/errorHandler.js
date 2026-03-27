function errorHandler(err, _req, res, _next) {
  console.error(err.stack);
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'Internal Server Error'
      : err.message || 'Internal Server Error';
  res.status(status).json({ message });
}

module.exports = errorHandler;
