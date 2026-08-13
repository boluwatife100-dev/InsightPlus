const User = require('../models/User');
const Business = require('../models/Business');
const Feedback = require('../models/Feedback');

const seedData = async () => {
  const existingUsers = await User.countDocuments();
  if (existingUsers > 0) {
    return;
  }

  const demoUser = new User({
    name: 'Sarah Johnson',
    email: 'demo@InsightLoop.app',
    passwordHash: 'demo1234',
    initials: 'SJ',
    role: 'Owner',
  });
  await demoUser.save();

  const demoBusiness = new Business({
    name: 'Rite Restaurant',
    initials: 'RR',
    plan: 'Pro plan',
    email: 'sarah@riterestaurant.com',
    owner: demoUser.id,
    current: true,
  });
  await demoBusiness.save();

  const demoFeedback = [
    {
      author: 'Anonymous',
      rating: 5,
      category: 'Food',
      sentiment: 'positive',
      comment: 'Great service and delicious food. We will come back again!',
    },
    {
      author: 'Anonymous',
      rating: 2,
      category: 'Service',
      sentiment: 'negative',
      comment: 'Staff were slow and forgot our drink order.',
    },
    {
      author: 'Anonymous',
      rating: 4,
      category: 'Ambience',
      sentiment: 'positive',
      comment: 'Nice atmosphere, pleasant lighting, and the music was just right.',
    },
  ];

  await Feedback.insertMany(demoFeedback);
  console.log('Seeded demo user, business, and feedback.');
};

module.exports = seedData;
