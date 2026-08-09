require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const feedbackRoutes = require('./routes/feedbackRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const businessRoutes = require('./routes/businessRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const aiInsightsRoutes = require('./routes/aiInsightsRoutes');
const errorHandler = require('./middleware/errorHandler');
const seedData = require('./utils/seedData');

const app = express();
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());

if (process.env.MONGO_URI) {
  connectDB().then(() => seedData()).catch((error) => console.error(error));
} else {
  console.warn('MONGO_URI is not set. Skipping database connection.');
}

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: `Server is running on port ${process.env.PORT || 5000}` }));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/businesses', businessRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai-insights', aiInsightsRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
