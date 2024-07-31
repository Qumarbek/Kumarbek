const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set 'secure: true' if using HTTPS
}));

app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); // Use ejs to render html files
app.set('view engine', 'ejs'); // Change 'html' to 'ejs'

// Routes
app.use('/auth', authRoutes);
app.use('/food', foodRoutes);
app.use('/cart', cartRoutes); // Ensure this line is correct
app.use('/contact', contactRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://ermacareer:ersultan12@cluster0.d6yz9xi.mongodb.net/Project0?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
