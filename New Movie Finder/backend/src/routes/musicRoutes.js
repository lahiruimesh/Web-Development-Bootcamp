const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const Media = require('../models/Media');
const { getSpotifyToken } = require('../utils/spotify');

// Search tracks
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        const token = await getSpotifyToken();

        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: {
                q: query,
                type: 'track',
                limit: 20
            }
        });

        const tracks = response.data.tracks.items.map(track => ({
            id: track.id,
            title: track.name,
            description: `${track.artists.map(artist => artist.name).join(', ')} • ${track.album.name}`,
            posterPath: track.album.images[0]?.url,
            type: 'music',
            streamUrl: track.preview_url // Include preview URL in search results
        }));

        res.json({ results: tracks });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Failed to search tracks' });
    }
});

// Get track details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const token = await getSpotifyToken();

        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const track = {
            id: response.data.id,
            title: response.data.name,
            description: `${response.data.artists.map(artist => artist.name).join(', ')} • ${response.data.album.name}`,
            posterPath: response.data.album.images[0]?.url,
            type: 'music',
            streamUrl: response.data.preview_url // Include preview URL in track details
        };

        res.json(track);
    } catch (error) {
        console.error('Track details error:', error);
        res.status(500).json({ message: 'Failed to fetch track details' });
    }
});

// Add music to favorites
router.post('/favorites', async (req, res) => {
    try {
        const { id, title, posterPath, description, releaseDate } = req.body;
        
        const existingMedia = await Media.findOne({ externalId: id, type: 'music' });
        if (existingMedia) {
            return res.status(400).json({ message: 'Track already in favorites' });
        }

        const media = new Media({
            title,
            type: 'music',
            externalId: id,
            posterPath,
            description,
            releaseDate
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.error('Add to favorites error:', error);
        res.status(500).json({ message: 'Failed to add track to favorites' });
    }
});

// Get stream URL for a track
router.get('/stream/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const token = await getSpotifyToken();

        const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.data.preview_url) {
            return res.status(404).json({ 
                message: 'No preview available for this track',
                error: 'PREVIEW_NOT_AVAILABLE'
            });
        }

        res.json({
            streamUrl: response.data.preview_url,
            type: 'audio/mpeg',
            title: response.data.name
        });
    } catch (error) {
        console.error('Stream URL error:', error);
        res.status(500).json({ message: 'Failed to get stream URL' });
    }
});

module.exports = router; 