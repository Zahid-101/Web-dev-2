const express = require('express');
const router = express.Router();
const { getItems, getItemById, createItem, deleteItem } = require('../controllers/itemController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getItems);
router.get('/:id', getItemById);

// Protected Admin Routes
router.post('/', protect, admin, createItem);
router.delete('/:id', protect, admin, deleteItem);

module.exports = router;
