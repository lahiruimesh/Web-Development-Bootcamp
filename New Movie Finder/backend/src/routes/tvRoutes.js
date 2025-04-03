const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const Media = require('../models/Media');

const OMDB_BASE_URL = 'http://www.omdbapi.com';

// Search TV series
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query || query.trim().length < 2) {
            return res.json({ results: [] });
        }

        console.log('Searching TV series with query:', query);
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: config.OMDB_API_KEY,
                s: query.trim(),
                type: 'series'
            }
        });

        console.log('OMDB Response:', response.data);

        if (response.data.Error) {
            console.log('OMDB Error:', response.data.Error);
            return res.json({ results: [] });
        }

        const shows = response.data.Search || [];
        console.log('Found TV shows:', shows.length);

        const results = await Promise.all(shows.map(async (show) => {
            try {
                const detailResponse = await axios.get(OMDB_BASE_URL, {
                    params: {
                        apikey: config.OMDB_API_KEY,
                        i: show.imdbID
                    }
                });

                return {
                    id: show.imdbID,
                    title: show.Title,
                    description: detailResponse.data.Plot || 'No plot available',
                    posterPath: show.Poster !== 'N/A' ? show.Poster : null,
                    releaseDate: show.Year,
                    rating: detailResponse.data.imdbRating || 'N/A',
                    genre: detailResponse.data.Genre || 'N/A',
                    type: 'tv'
                };
            } catch (error) {
                console.error('Error fetching TV show details:', error);
                return {
                    id: show.imdbID,
                    title: show.Title,
                    description: 'Plot not available',
                    posterPath: show.Poster !== 'N/A' ? show.Poster : null,
                    releaseDate: show.Year,
                    type: 'tv'
                };
            }
        }));

        res.json({ results });
    } catch (error) {
        console.error('TV search error:', error.response?.data || error.message);
        res.status(500).json({ 
            message: 'Failed to search TV series',
            error: error.response?.data || error.message
        });
    }
});

// Get TV series details
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: config.OMDB_API_KEY,
                i: id,
                plot: 'full'
            }
        });

        if (response.data.Error) {
            return res.status(404).json({ message: 'TV series not found' });
        }

        const show = {
            id: response.data.imdbID,
            title: response.data.Title,
            description: response.data.Plot,
            posterPath: response.data.Poster !== 'N/A' ? response.data.Poster : null,
            releaseDate: response.data.Year,
            rating: response.data.imdbRating,
            totalSeasons: response.data.totalSeasons,
            genre: response.data.Genre,
            creator: response.data.Writer,
            actors: response.data.Actors,
            type: 'tv'
        };

        res.json(show);
    } catch (error) {
        console.error('TV details error:', error);
        res.status(500).json({ message: 'Failed to fetch TV series details' });
    }
});

// Add TV series to favorites
router.post('/favorites', async (req, res) => {
    try {
        const { id, title, posterPath, description, releaseDate } = req.body;
        
        const existingMedia = await Media.findOne({ externalId: id, type: 'tv' });
        if (existingMedia) {
            return res.status(400).json({ message: 'TV series already in favorites' });
        }

        const media = new Media({
            title,
            type: 'tv',
            externalId: id,
            posterPath,
            description,
            releaseDate
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.error('Add to favorites error:', error);
        res.status(500).json({ message: 'Failed to add TV series to favorites' });
    }
});

module.exports = router; 