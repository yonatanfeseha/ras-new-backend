import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

import memberRoutes from './routes/member.routes.js';
import healthRoutes from './routes/health.routes.js';
import emergencyRoutes from './routes/emergency.routes.js';
import scheduleRoutes from './routes/schedule.routes.js';
import trainingTypeRoutes from './routes/trainingType.routes.js';
import statsRoutes from './routes/stats.routes.js';
import coachRoutes from './routes/coach.routes.js';
import memberServiceRoutes from './routes/memberService.routes.js';
import coachServiceRoutes from './routes/coachService.routes.js';

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// routes
app.use('/api/members', memberRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/training-types', trainingTypeRoutes);
app.use('/api/member-service', memberServiceRoutes);
app.use('/api/coach-service', coachServiceRoutes);
// health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Server Error',
  });
});

export default app;
