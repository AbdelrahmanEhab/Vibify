import openai from '../config/openai';
import { MusicResponse, Song } from '../types';

// Keep track of previously suggested songs
let previousSongs: string[] = [];

// Helper function to validate emojis
const isValidEmoji = (text: string): boolean => {
  // Regex to match emoji characters
  const emojiRegex = /[\p{Emoji}\u200B-\u200D\uFE0F]/gu;
  return emojiRegex.test(text);
};

// Helper function to get a reliable placeholder image
const getReliableImageUrl = (): string => {
  // Using a reliable CDN for placeholder images
  return 'https://raw.githubusercontent.com/spotify/web-api/main/docs/images/spotify-logo.png';
};

// Helper function to clean markdown-style URLs
const cleanUrl = (url: string): string => {
  // Remove markdown-style formatting [text](url)
  const urlMatch = url.match(/\[([^\]]+)\]\(([^)]+)\)/);
  return urlMatch ? urlMatch[2] : url;
};

// Helper function to clean song name
const cleanSongName = (name: string): string => {
  // Remove quotes and clean up the name
  // Remove numbering (e.g., "1. ", "2. ", etc.) from the beginning
  return name.replace(/^["']|["']$/g, '')
             .replace(/^\d+\.\s*/, '')
             .trim();
};

// Helper function to parse ChatGPT response
const parseSongsResponse = async (response: string): Promise<Song[]> => {
  try {
    // Split the response into lines and filter out empty lines
    const lines = response.split('\n').filter(line => line.trim());
    
    // Parse each line into song objects
    const songs = lines.map(line => {
      try {
        // Split by | and clean up each part
        const [name, artist, album, url, artistPhotoUrl] = line.split('|').map(part => part.trim());
        
        // Clean up the song name
        const cleanName = cleanSongName(name);
        
        // Clean up markdown-style URLs
        const cleanSpotifyUrl = cleanUrl(url);
        const cleanArtistUrl = cleanUrl(artistPhotoUrl);
        
        // Add to previous songs list
        previousSongs.push(cleanName);
        
        return {
          name: cleanName || 'Unknown Song',
          artist: artist || 'Unknown Artist',
          album: album || 'Unknown Album',
          url: cleanSpotifyUrl || 'https://open.spotify.com',
          artistPhotoUrl: cleanArtistUrl || getReliableImageUrl()
        };
      } catch (error) {
        console.error('Error processing song:', error);
        return null;
      }
    }).filter((song): song is Song => song !== null);
    
    return songs;
  } catch (error) {
    console.error('Error parsing songs response:', error);
    return [];
  }
};

export const getSongSuggestions = async (emojis: string): Promise<MusicResponse> => {
  try {
    // Validate that the input only contains emojis
    if (!isValidEmoji(emojis)) {
      throw new Error('Input must only contain emojis and commas');
    }

    const emojiArray = emojis.split(',').map(emoji => emoji.trim());
    
    // Validate each individual emoji
    if (emojiArray.some(emoji => !isValidEmoji(emoji))) {
      throw new Error('Each emoji must be valid');
    }

    // Create a list of previously suggested songs for the prompt
    const previousSongsList = previousSongs.length > 0 
      ? `\nPlease DO NOT suggest these previously suggested songs:\n${previousSongs.join(', ')}`
      : '';

    const prompt = `Suggest 10 songs different from last songs that match the mood of these emojis: ${emojiArray.join(', ')}.${previousSongsList}
    For each song, provide the song name, artist, album, Spotify URL, and artist photo URL.
    Format each song on a new line like this: Song Name | Artist Name | Album Name | Spotify URL | Artist Photo URL
    
    Important requirements:
    1. Make sure all Spotify URLs are current and working (use the latest Spotify track URLs)
    2. For artist photos, ONLY use these specific sources:
       - Official artist website photos (preferred)
       - Official artist press photos from their record label website
       - Official artist photos from their management company website
    3. Verify that all songs and albums are currently available on Spotify
    4. Ensure all information is accurate and up-to-date
    5. Use recent songs and albums when possible
    6. Double-check that all URLs are accessible and not broken
    7. IMPORTANT: For artist photos, use direct image URLs (ending in .jpg, .png, or .webp)
       - Do not use URLs that require JavaScript or redirects
       - Do not use URLs from social media platforms
       - Do not use URLs from image hosting services
       - Do not use URLs from music streaming platforms
       - Do not use URLs from Wikipedia or other encyclopedias
       - Do not use URLs from news websites
       - Do not use URLs from fan sites
    8. IMPORTANT: Provide direct URLs without any markdown formatting
    9. IMPORTANT: Do not include quotes around song names in the response
    
    Make sure the suggestions are diverse and match the emotional tone of the emojis.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a music expert who suggests songs based on emojis. Provide accurate, up-to-date song information with working Spotify links and high-quality artist photos. Always verify that all URLs are current and accessible. For artist photos, only use direct image URLs from official sources. Provide direct URLs without any markdown formatting. Do not include quotes around song names."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content received from OpenAI');
    }

    const songs = await parseSongsResponse(content);
    return {
      emojis: emojiArray,
      songs
    };
  } catch (error) {
    console.error('Error in getSongSuggestions:', error);
    throw error;
  }
}; 