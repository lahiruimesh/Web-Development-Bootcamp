const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['movie', 'tv', 'music'],
        required: true
    },
    externalId: {
        type: String,
        required: true
    },
    posterPath: String,
    description: String,
    releaseDate: Date,
    downloadUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Media', mediaSchema); 