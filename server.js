const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:", "http:", "https://pacdn.aoneroom.com", "https://image.tmdb.org", "https://via.placeholder.com"],
      connectSrc: ["'self'", "https://movieapi.giftedtech.co.ke"]
    }
  }
}));
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Configuration
const BASE_URL = 'https://movieapi.giftedtech.co.ke/api';

// API Routes
app.get('/api/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    console.log(`🔍 Search request: ${query}`);
    
    const response = await fetch(`${BASE_URL}/search/${encodeURIComponent(query)}`);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    res.status(500).json({ 
      error: 'Search failed', 
      message: error.message 
    });
  }
});

app.get('/api/info/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    console.log(`🎬 Info request: ${movieId}`);
    
    const response = await fetch(`${BASE_URL}/info/${movieId}`);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Info API error:', error);
    res.status(500).json({ 
      error: 'Failed to get movie info', 
      message: error.message 
    });
  }
});

app.get('/api/sources/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    console.log(`⬇️ Sources request: ${movieId}`);
    
    const response = await fetch(`${BASE_URL}/sources/${movieId}`);
    const data = await response.json();
    
    res.json(data);
  } catch (error) {
    console.error('Sources API error:', error);
    res.status(500).json({ 
      error: 'Failed to get download sources', 
      message: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Stream X 2.0 API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Stream X 2.0 Server running on port ${PORT}`);
  console.log(`📍 Local: http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
});
