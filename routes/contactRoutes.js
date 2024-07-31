const express = require('express');
const path = require('path'); // Ensure path is required here
const router = express.Router();

// Route to render the contact page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/contact.html')); // Use path.join to resolve the file path
});

module.exports = router;
