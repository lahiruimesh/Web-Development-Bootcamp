const axios = require('axios');
const config = require('../config/config');

let spotifyToken = null;
let tokenExpiry = null;

// Function to get Spotify access token
const getSpotifyToken = async () => {
    if (spotifyToken && tokenExpiry && Date.now() < tokenExpiry) {
        return spotifyToken;
    }

    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', 
            'grant_type=client_credentials',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(
                        config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_SECRET
                    ).toString('base64')
                }
            }
        );

        spotifyToken = response.data.access_token;
        tokenExpiry = Date.now() + (response.data.expires_in * 1000);
        return spotifyToken;
    } catch (error) {
        console.error('Failed to get Spotify token:', error);
        throw error;
    }
};

module.exports = {
    getSpotifyToken
}; 