const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Create streams directory if it doesn't exist
const streamsDir = path.join(__dirname, '../../streams');
if (!fs.existsSync(streamsDir)) {
    fs.mkdirSync(streamsDir, { recursive: true });
}

// Initialize streaming queue
const streamingQueue = new Map();

// Start streaming
router.post('/start', [
    body('mediaId').notEmpty().trim(),
    body('mediaType').isIn(['movie', 'tv', 'music']),
    body('title').notEmpty().trim(),
    body('streamUrl').notEmpty().trim(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { mediaId, mediaType, title, streamUrl } = req.body;
        
        // Generate a unique streaming ID
        const streamId = `${mediaType}-${mediaId}-${Date.now()}`;
        
        // Add to streaming queue
        streamingQueue.set(streamId, {
            status: 'ready',
            mediaId,
            mediaType,
            title,
            streamUrl,
            startTime: new Date()
        });

        res.json({
            streamId,
            message: 'Stream ready',
            status: 'ready'
        });
    } catch (error) {
        console.error('Streaming start error:', error);
        res.status(500).json({ message: 'Failed to prepare stream' });
    }
});

// Get stream status
router.get('/status/:streamId', (req, res) => {
    const { streamId } = req.params;
    const stream = streamingQueue.get(streamId);

    if (!stream) {
        return res.status(404).json({ message: 'Stream not found' });
    }

    res.json(stream);
});

// Get all active streams
router.get('/active', (req, res) => {
    const streams = Array.from(streamingQueue.entries()).map(([id, data]) => ({
        streamId: id,
        ...data
    }));

    res.json(streams);
});

// Stream content
router.get('/:streamId/play', async (req, res) => {
    const { streamId } = req.params;
    const stream = streamingQueue.get(streamId);

    if (!stream) {
        return res.status(404).json({ message: 'Stream not found' });
    }

    try {
        // For music, we'll stream directly from the source
        if (stream.mediaType === 'music') {
            // Forward the stream URL for music preview
            res.json({
                streamUrl: stream.streamUrl,
                type: 'audio/mpeg',
                title: stream.title
            });
        } else {
            // For videos, we'll need to proxy the stream
            const range = req.headers.range;
            if (!range) {
                res.status(400).json({ message: 'Range header required for video streaming' });
                return;
            }

            // Forward stream URL and necessary headers for video
            res.json({
                streamUrl: stream.streamUrl,
                type: 'video/mp4',
                title: stream.title,
                requiresRange: true
            });
        }
    } catch (error) {
        console.error('Streaming error:', error);
        res.status(500).json({ message: 'Failed to stream content' });
    }
});

// End stream
router.delete('/:streamId', (req, res) => {
    const { streamId } = req.params;
    streamingQueue.delete(streamId);
    res.json({ message: 'Stream ended' });
});

module.exports = router; 