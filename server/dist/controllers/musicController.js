"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMusicSuggestions = void 0;
const musicService_1 = require("../services/musicService");
// Helper function to validate emojis
const validateEmojis = (emojis) => {
    if (!emojis)
        return false;
    const emojiArray = emojis.split(',').map(emoji => emoji.trim());
    return emojiArray.length > 0 && emojiArray.every(emoji => emoji.length > 0);
};
const getMusicSuggestions = async (req, res) => {
    const { emojis } = req.query;
    // Validate emojis parameter
    if (!validateEmojis(emojis)) {
        const errorResponse = {
            error: "Invalid or missing emojis query parameter."
        };
        res.status(400).json(errorResponse);
        return;
    }
    try {
        const result = await (0, musicService_1.getSongSuggestions)(emojis);
        res.json(result);
    }
    catch (error) {
        console.error('Error in getMusicSuggestions controller:', error);
        const errorResponse = {
            error: "An error occurred while fetching song suggestions."
        };
        res.status(500).json(errorResponse);
    }
};
exports.getMusicSuggestions = getMusicSuggestions;
//# sourceMappingURL=musicController.js.map