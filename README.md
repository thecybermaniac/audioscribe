# AI Text-to-Audio Generator

A modern, minimalistic web application that converts text to audio using Groq Cloud AI models.

![AudioScribe](/src/assets/thumbnail.png)

## Features

- 🎵 **Text-to-Audio Generation**: Convert any text to high-quality audio using Groq Cloud AI
- 📁 **File Upload Support**: Upload .txt files or paste text directly
- 🎧 **Built-in Audio Player**: Play, pause, seek, and download generated audio
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- ⚡ **Real-time Processing**: Fast audio generation with loading indicators
- 🚫 **No Login Required**: Free to use without registration

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-text-to-audio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Groq API**
   - Copy `.env.example` to `.env`
   - Get your API key from [Groq Console](https://console.groq.com/keys)
   - Add your API key to the `.env` file:
     ```
     VITE_GROQ_API_KEY=your_actual_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GROQ_API_KEY` | Your Groq Cloud API key | Yes |

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **AI Service**: Groq Cloud API
- **Build Tool**: Vite
- **Icons**: Lucide React

## API Integration

This application uses Groq Cloud's text-to-speech API with the following configuration:
- Model: `tts-1`
- Voice: `alloy`
- Format: `mp3`

## Error Handling

The application includes comprehensive error handling for:
- Network connectivity issues
- API authentication errors
- Service quota limits
- Invalid text input
- General API errors

## Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel, Netlify, or any static hosting service
   - Make sure to set the `VITE_GROQ_API_KEY` environment variable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details