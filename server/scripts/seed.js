require('dotenv').config();
const connectDB = require('../config/db');
const seedData = require('../utils/seedData');

const runSeed = async () => {
  try {
    await connectDB();
    await seedData();
    console.log('Seed completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

runSeed();
