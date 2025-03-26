import express from 'express';
import cors from 'cors';
import { getSongSuggestions } from './services/musicService';

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Accept'] // Allow specific headers
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Song suggestions endpoint
app.get('/api/music', async (req, res) => {
  try {
    const { emojis } = req.query;
    
    if (!emojis || typeof emojis !== 'string') {
      return res.status(400).json({ error: 'Emojis are required' });
    }

    const response = await getSongSuggestions(emojis);
    res.json(response);
  } catch (error) {
    console.error('Error in /api/music:', error);
    res.status(500).json({ error: 'Failed to get song suggestions' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 