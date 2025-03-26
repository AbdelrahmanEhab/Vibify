import express from 'express';
import { getMusicSuggestions } from '../controllers/musicController';

const router = express.Router();

// GET /api/music
router.get('/', getMusicSuggestions);

export default router; 