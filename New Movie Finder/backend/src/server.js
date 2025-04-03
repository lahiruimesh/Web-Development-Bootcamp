const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Backend is working!',
        omdbKey: config.OMDB_API_KEY ? 'Present' : 'Missing'
    });
});

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/tv', require('./routes/tvRoutes'));
app.use('/api/music', require('./routes/musicRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));
app.use('/api/streams', require('./routes/downloadRoutes'));

// Serve static files
const streamsDir = path.join(__dirname, '../streams');
// Serve downloaded files
const downloadsPath = path.join(__dirname, '../downloads');
app.use('/downloads', express.static(downloadsPath));
app.get('/downloads/:filename', (req, res) => {
    const filePath = path.join(downloadsPath, req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Download error:', err);
            if (!res.headersSent) {
                res.status(404).json({ message: 'File not found' });
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ 
        message: 'Something went wrong!',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Handle 404 routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.url} not found` });
});

const PORT = config.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Environment:', process.env.NODE_ENV || 'development');
    console.log('OMDB API Key:', config.OMDB_API_KEY ? 'Present' : 'Missing');
}); 