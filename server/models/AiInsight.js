const mongoose = require('mongoose');

const aiInsightSchema = new mongoose.Schema(
  {
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
    summary: {
      text: { type: String, required: true },
      highlights: [{ type: String }],
    },
    recommendedAction: {
      text: { type: String, required: true },
    },
    issues: [
      {
        label: { type: String, required: true },
        pct: { type: Number, required: true },
        count: { type: Number },
      }
    ],
  },
  { timestamps: true }
);

aiInsightSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('AiInsight', aiInsightSchema);
