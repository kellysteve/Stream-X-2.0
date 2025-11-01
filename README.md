# Stream X 2.0 - Movie Discovery Website

A modern movie discovery website that allows users to search for movies, view detailed information, and explore cast details.

## Features

- 🎬 Search for movies
- 📖 View detailed movie information
- 👥 See cast members and their roles
- 🎯 Popular movie quick search
- 📱 Responsive design
- ⚡ Fast loading

## Deployment on Render

1. **Fork this repository** to your GitHub account

2. **Go to [Render.com](https://render.com)** and sign up/login

3. **Click "New +"** and select "Web Service"

4. **Connect your GitHub repository**

5. **Configure deployment:**
   - **Name:** `stream-x-website` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. **Click "Create Web Service"**

7. **Wait for deployment** - Render will automatically build and deploy your website

## Environment Variables

No environment variables required for basic functionality.

## API Endpoints

The website uses the following API endpoints:
- `GET /api/search/:query` - Search for movies
- `GET /api/info/:movieId` - Get movie details
- `GET /api/sources/:movieId` - Get download sources (returns empty)

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
