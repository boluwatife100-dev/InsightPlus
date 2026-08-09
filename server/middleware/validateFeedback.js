const validateFeedback = (req, res, next) => {
  const { rating, category, comment, author } = req.body;

  if (!category || !category.toString().trim()) {
    return res.status(400).json({ detail: 'Category is required.' });
  }

  if (!comment || !comment.toString().trim()) {
    return res.status(400).json({ detail: 'Comment is required.' });
  }

  if (rating === undefined || rating === null || Number(rating) < 1 || Number(rating) > 5) {
    return res.status(400).json({ detail: 'Rating must be a number between 1 and 5.' });
  }

  if (author !== undefined && author !== null && !author.toString().trim()) {
    return res.status(400).json({ detail: 'Author, when provided, must not be empty.' });
  }

  next();
};

module.exports = validateFeedback;