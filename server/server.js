const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express();
const port = process.env.PORT || 3001; // Use Render's port or 3001 for local

// Middleware to parse JSON bodies
app.use(express.json());

// --- THIS IS THE NEW PART ---
// Serve the static files from the React app's build directory
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
// --------------------------

// Your API route for feedback
app.post('/api/feedback', (req, res) => {
  const { orderId, rating, comments } = req.body;
  console.log('--- DRIVER FEEDBACK RECEIVED ---');
  console.log(`Order ID: ${orderId}`);
  console.log(`Rating: ${rating}`);
  console.log(`Comments: ${comments}`);
  res.status(200).json({ message: 'Feedback received successfully' });
});

// --- THIS IS ALSO NEW ---
// Handles any requests that don't match the API route
// This sends the main React app page for any other URL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});
// ----------------------

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});