import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoute from './routes/productRoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Resolve __dirname (for ES module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: '*', 
  })
);

app.use(express.json());

// API routes
app.use('/api/products', productRoute);

// Static files from React
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all for frontend routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
