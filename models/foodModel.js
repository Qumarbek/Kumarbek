// foodModel.js
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    veg: Boolean,
    price: Number,
    description: String,
    quantity: Number,
    img: String,
    sizeandcrust: Array,
    ratings: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }] // Add ratings field
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
