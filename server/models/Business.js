const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    type: {type: String, required: true, trim: true},
    initials: { type: String, required: true, trim: true },
    plan: { type: String, default: 'Pro plan' },
    email: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    current: { type: Boolean, default: false },
  },
  { timestamps: true }
);

businessSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Business', businessSchema);
