import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import navigationRoutes from './routes/navigation.js';
import adminRoutes from './routes/admin.js';

// Initialize env vars (like TWILIO_ACCOUNT_SID, DATABASE_URL)
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON body

// Basic Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Register API Routes
app.use('/api/nav', navigationRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
});
