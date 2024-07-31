const Cart = require('../models/cartModel');
const Food = require('../models/foodModel');

exports.addToCart = async (req, res) => {
  try {
    const { foodId } = req.body;
    console.log('Received foodId:', foodId);

    if (!Number.isInteger(Number(foodId))) {
      return res.status(400).send('Invalid food ID');
    }

    const foodItem = await Food.findOne({ id: Number(foodId) });
    if (!foodItem) {
      return res.status(404).send('Food item not found');
    }

    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    let cart = await Cart.findOne({ userId: req.session.userId });
    if (!cart) {
      cart = new Cart({ userId: req.session.userId, items: [] });
    }

    if (!cart.items.includes(Number(foodId))) {
      cart.items.push(Number(foodId));
      await cart.save();
    }

    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Server error');
  }
};

exports.getCart = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect('/auth/login');
    }

    const cart = await Cart.findOne({ userId: req.session.userId });
    const cartItems = cart ? await Food.find({ id: { $in: cart.items } }) : [];
    
    res.render('cart', { cartItems });
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).send('Server error');
  }
};

exports.confirmPurchase = async (req, res) => {
  try {
    const { foodId, name, address, phone } = req.body;

    if (!Number.isInteger(Number(foodId))) {
      return res.status(400).send('Invalid food ID');
    }

    const foodItem = await Food.findOne({ id: Number(foodId) });
    if (!foodItem) {
      return res.status(404).send('Food item not found');
    }

    // Assume you have a method to calculate the estimated arrival time
    const estimatedArrivalTime = new Date(Date.now() + 45 * 60 * 1000).toLocaleTimeString(); // 45 minutes from now

    // Handle the purchase logic here (e.g., save to order history, send notification, etc.)
    console.log('Purchase confirmed for:', {
      foodId,
      name,
      address,
      phone,
      estimatedArrivalTime
    });

    // Optionally, you could remove the item from the cart after purchase
    const cart = await Cart.findOne({ userId: req.session.userId });
    if (cart) {
      cart.items = cart.items.filter(item => item !== Number(foodId));
      await cart.save();
    }

    res.redirect('/cart'); // Redirect back to cart after purchase confirmation
  } catch (err) {
    console.error('Error confirming purchase:', err);
    res.status(500).send('Server error');
  }
};
