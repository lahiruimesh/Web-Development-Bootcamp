const express = require('express');
const router = express.Router();
const axios = require('axios');
const config = require('../config/config');
const Media = require('../models/Media');

const OMDB_BASE_URL = 'http://www.omdbapi.com';

// Search movies
router.get('/search', async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query || query.trim().length < 2) {
            return res.json({ results: [] });
        }

        console.log('Searching movies with query:', query);
        const response = await axios.get(OMDB_BASE_URL, {
            params: {
                apikey: config.OMDB_API_KEY,
                s: query.trim(),
                type: 'movie'
            }
        });

        console.log('OMDB Response:', response.data);

        if (response.data.Error) {
            console.log('OMDB Error:', response.data.Error);
            return res.json({ results: [] });
        }

        const movies = response.data.Search || [];
        console.log('Found movies:', movies.length);

        const results = await Promise.all(movies.map(async (movie) => {
            try {
                const detailResponse = await axios.get(OMDB_BASE_URL, {
                    params: {
                        apikey: config.OMDB_API_KEY,
                        i: movie.imdbID
                    }
                });

                return {
                    id: movie.imdbID,
                    title: movie.Title,
                    description: detailResponse.data.Plot || 'No plot available',
                    posterPath: movie.Poster !== 'N/A' ? movie.Poster : null,
                    releaseDate: movie.Year,
                    rating: detailResponse.data.imdbRating || 'N/A',
                    genre: detailResponse.data.Genre || 'N/A',
                    type: 'movie'
                };
            } catch (error) {
                console.error('Error fetching movie details:', error);
                return {
                    id: movie.imdbID,
                    title: movie.Title,
                    description: 'Plot not available',
                    posterPath: movie.Poster !== 'N/A' ? movie.Poster : null,
                    releaseDate: movie.Year,
                    type: 'movie'
                };
            }
        }));

        res.json({ results });
    } catch (error) {
        console.error('Movie search error:', error.response?.data || error.message);
        res.status(500).json({ 
            message: 'Failed to search movies',
            error: error.response?.data || error.message
        });
    }
});

// Get movie details
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
            return res.status(404).json({ message: 'Movie not found' });
        }

        const movie = {
            id: response.data.imdbID,
            title: response.data.Title,
            description: response.data.Plot,
            posterPath: response.data.Poster !== 'N/A' ? response.data.Poster : null,
            releaseDate: response.data.Year,
            rating: response.data.imdbRating,
            runtime: response.data.Runtime,
            genre: response.data.Genre,
            director: response.data.Director,
            actors: response.data.Actors,
            type: 'movie'
        };

        res.json(movie);
    } catch (error) {
        console.error('Movie details error:', error);
        res.status(500).json({ message: 'Failed to fetch movie details' });
    }
});

// Add movie to favorites
router.post('/favorites', async (req, res) => {
    try {
        const { id, title, posterPath, description, releaseDate } = req.body;
        
        const existingMedia = await Media.findOne({ externalId: id, type: 'movie' });
        if (existingMedia) {
            return res.status(400).json({ message: 'Movie already in favorites' });
        }

        const media = new Media({
            title,
            type: 'movie',
            externalId: id,
            posterPath,
            description,
            releaseDate
        });

        await media.save();
        res.status(201).json(media);
    } catch (error) {
        console.error('Add to favorites error:', error);
        res.status(500).json({ message: 'Failed to add movie to favorites' });
    }
});

module.exports = router; 