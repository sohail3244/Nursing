import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

// import indexRoutes from './routes/index.js';

const app = express();

// ---------- HEALTH (NO TENANT) ----------
app.get('/v1/health', (req, res) => {
  res.status(200).send('OK');
});

// ---------- MIDDLEWARE ----------
app.use(cors({ origin: true, credentials: true }));
app.set('trust proxy', 1);
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());
app.use(helmet());

// ---------- API ----------
// app.use('/v1', indexRoutes);
app.use('/v1/auth', authRoutes); 
app.use('/v1/user', userRoutes); 


export default app;