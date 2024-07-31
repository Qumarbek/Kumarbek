const axios = require('axios');
const User = require('../models/userModel');

exports.getFoodMenu = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://pizza-and-desserts.p.rapidapi.com/pizzas',
    headers: {
 'x-rapidapi-key': '8db06a9f3emsh4bb4088dd08fd07p1d6401jsn9e605c866686',
    'x-rapidapi-host': 'pizza-and-desserts.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    let pizzas = response.data; // Ensure this is an array of objects with the required fields

    // Filter pizzas based on search query
    const searchQuery = req.query.search || '';
    if (searchQuery) {
      pizzas = pizzas.filter(pizza => pizza.name.toLowerCase().startsWith(searchQuery.toLowerCase()));
    }

    let username = null;
    if (req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        username = user.username;
      }
    }

    res.render('food', { pizzas, username }); // Pass username to the template
  } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.status(500).send('Error fetching pizzas');
  }
};
