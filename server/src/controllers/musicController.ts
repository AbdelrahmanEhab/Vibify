import { Request, Response } from 'express';
import { getSongSuggestions } from '../services/musicService';
import { ErrorResponse } from '../types';

// Helper function to validate emojis
const validateEmojis = (emojis: string | undefined): boolean => {
  if (!emojis) return false;
  const emojiArray = emojis.split(',').map(emoji => emoji.trim());
  return emojiArray.length > 0 && emojiArray.every(emoji => emoji.length > 0);
};

export const getMusicSuggestions = async (req: Request, res: Response): Promise<void> => {
  const { emojis } = req.query;

  // Validate emojis parameter
  if (!validateEmojis(emojis as string)) {
    const errorResponse: ErrorResponse = {
      error: "Invalid or missing emojis query parameter."
    };
    res.status(400).json(errorResponse);
    return;
  }

  try {
    const result = await getSongSuggestions(emojis as string);
    res.json(result);
  } catch (error) {
    console.error('Error in getMusicSuggestions controller:', error);
    const errorResponse: ErrorResponse = {
      error: "An error occurred while fetching song suggestions."
    };
    res.status(500).json(errorResponse);
  }
}; 