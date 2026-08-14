const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema(
  {
    author: { type: String, required: true, trim: true, default: 'Anonymous' },
    comment: { type: String, required: true, trim: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    category: { type: String, required: true, trim: true },
    sentiment: {
      type: String,
      enum: ['positive', 'neutral', 'negative'],
      required: true,
    },
    emotion: { type: String },
    productRating: { type: Number, min: 1, max: 5 },
    serviceRating: { type: Number, min: 1, max: 5 },
    teamRating: { type: Number, min: 1, max: 5 },
    contactRequested: { type: Boolean, default: false },
    contactName: { type: String },
    contactEmail: { type: String },
  },
  { timestamps: true }
);

feedbackSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Feedback', feedbackSchema);
