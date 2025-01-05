import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';

dotenv.config();


const port = process.env.PORT || 5000;
const app = express();

app.use(
    cors({
      origin: 'http://localhost:5173',
    })
  );

app.use(express.json());
app.use('/api/products', productRoute);

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);

});