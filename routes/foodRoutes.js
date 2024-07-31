// foodRoutes.js
const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const ratingController = require('../controllers/ratingController');

router.get('/', foodController.getFoodMenu);
router.post('/rate', ratingController.submitRating); // Add this route


module.exports = router;
