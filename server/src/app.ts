import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

export default app;
