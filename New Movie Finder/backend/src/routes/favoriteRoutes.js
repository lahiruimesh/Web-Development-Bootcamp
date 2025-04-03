const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Get all favorites
router.get('/', async (req, res) => {
    try {
        const favorites = await Media.find().sort({ createdAt: -1 });
        res.json(favorites);
    } catch (error) {
        console.error('Fetch favorites error:', error);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});

// Remove from favorites
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Media.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        console.error('Remove from favorites error:', error);
        res.status(500).json({ message: 'Failed to remove from favorites' });
    }
});

// Get favorites by type
router.get('/type/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const favorites = await Media.find({ type }).sort({ createdAt: -1 });
        res.json(favorites);
    } catch (error) {
        console.error('Fetch favorites by type error:', error);
        res.status(500).json({ message: 'Failed to fetch favorites' });
    }
});

module.exports = router; 