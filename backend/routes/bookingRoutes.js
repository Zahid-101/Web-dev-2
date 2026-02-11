const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { validateBooking } = require('../middleware/validation'); // Corrected path/file name

router.post('/', validateBooking, createBooking);

module.exports = router;
