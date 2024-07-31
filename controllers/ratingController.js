// controllers/ratingController.js
const Food = require('../models/foodModel');
const User = require('../models/userModel');

exports.submitRating = async (req, res) => {
    try {
        const { foodId, rating } = req.body;

        if (!Number.isInteger(Number(foodId)) || rating < 1 || rating > 5) {
            return res.status(400).send('Invalid input');
        }

        const userId = req.session.userId;
        if (!userId) {
            return res.redirect('/auth/login');
        }

        const foodItem = await Food.findOne({ id: Number(foodId) });
        if (!foodItem) {
            return res.status(404).send('Food item not found');
        }

        // Check if the user has already rated this food
        const existingRating = foodItem.ratings.find(r => r.userId.toString() === userId.toString());
        if (existingRating) {
            existingRating.rating = rating;
        } else {
            foodItem.ratings.push({ userId, rating });
        }

        await foodItem.save();

        res.redirect('/food'); // Redirect or respond with a message
    } catch (err) {
        console.error('Error submitting rating:', err);
        res.status(500).send('Server error');
    }
};
