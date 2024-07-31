const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Existing routes
router.get('/', cartController.getCart);
router.post('/add', cartController.addToCart);

// New route for purchase confirmation
router.post('/confirm-purchase', cartController.confirmPurchase);

module.exports = router;
