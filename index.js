const express = require('express');
const connectDB = require('./config/db');
const sitemapRoutes = require('./Routes/siteMapRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Add routes
app.use('/', sitemapRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));