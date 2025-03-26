# Vibify Server

An Express API that suggests songs based on emojis using OpenAI's GPT model.

## Features

- Get song suggestions based on emojis
- Returns song name, artist, and Spotify link
- Powered by OpenAI's GPT model
- Error handling for invalid inputs

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd vibify-server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenAI API key:

```
PORT=5000
OPENAI_API_KEY=your-openai-api-key-here
```

4. Start the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Usage

### Get Song Suggestions

**Endpoint:** `GET /api/music`

**Query Parameters:**

- `emojis`: Comma-separated list of emojis (e.g., `?emojis=😊,😎`)

**Example Request:**

```
GET http://localhost:5000/api/music?emojis=😊,😎
```

**Example Response:**

```json
{
  "emojis": ["😊", "😎"],
  "songs": [
    {
      "name": "Happy",
      "artist": "Pharrell Williams",
      "url": "https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH"
    }
    // ... more songs
  ]
}
```

**Error Response:**

```json
{
  "error": "Invalid or missing emojis query parameter."
}
```

## Error Handling

The API returns appropriate error messages for:

- Missing emojis parameter
- Invalid emoji format
- Server errors

## License

MIT
