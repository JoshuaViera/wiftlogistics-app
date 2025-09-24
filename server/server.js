const express = require('express');
const cors = require('cors');
// 1. Import the routes from our new file
const apiRoutes = require('./routes/api');

const app = express();
const PORT = 3001;

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
// 2. This is the crucial new line.
// It tells the server: for any request that starts with '/api',
// use the logic defined in our apiRoutes file.
app.use('/api', apiRoutes);

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running successfully on http://localhost:${PORT}`);
});

