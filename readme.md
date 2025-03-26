# Vibify

## Description

Vibify is a web application that generates Spotify song recommendations based on the user's emoji and mood. Using the OpenAI API to analyze the input and fetch song links and details, Vibify creates personalized playlists for users.

## Features

- Generates song recommendations based on the user's emoji and mood.
- Retrieves Spotify song links and details.

## Usage

1. Usage Input an emoji or mood, and Vibify will generate ten matching Spotify songs.

2. Click on the generated songs to listen to them on Spotify.

## Installation

To run Vibify locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/AbdelrahmanEhab/vibify.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (e.g., for OpenAI API and Spotify API keys):
   Create a .env file and add the necessary keys as follows:

   ```bash
   PORT=5000
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Run the project:

   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```bash
   http://localhost:3000
   ```
