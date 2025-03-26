import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import musicRoutes from './routes/musicRoutes';
import { ErrorResponse } from './types';
import cors from 'cors'

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: "http://localhost:3000", // Allow requests only from Next.js frontend
  credentials: true, // Allow cookies if needed
  methods: ["GET", "POST", "OPTIONS"], 
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.use('/api/music', musicRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  const errorResponse: ErrorResponse = {
    error: "Something went wrong! Please try again later."
  };
  res.status(500).json(errorResponse);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 