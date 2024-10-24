import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cors from 'cors';

dotenv.config(); 
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT!;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
