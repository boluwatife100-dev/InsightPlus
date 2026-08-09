// Catches errors from async route handlers and Mongoose validation
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(', ') });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'Server error',
  });
};

module.exports = errorHandler;