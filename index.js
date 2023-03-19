const express = require('express');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const connectDB = require('./config/db');

const app = express();
connectDB();

// sitemap routes
app.get('/sitemap.xml', async (req, res) => {
  try {
    const smStream = new SitemapStream({
      hostname: 'https://urspayce.com'
    });

    const pipeline = smStream.pipe(createGzip());

    // sitemap URLs
    smStream.write({ url: 'https://urspayce.com', changefreq: 'daily', priority: 0.3 });
    smStream.write({ url: 'https://urspayce.com/about', changefreq: 'monthly', priority: 0.7 });
    smStream.write({ url: 'https://urspayce.com/career', changefreq: 'monthly', priority: 0.7 });

    // End sitemap stream
    smStream.end();

    // Generate XML sitemap
    const sitemap = await streamToPromise(pipeline);

    // Set headers
    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    res.send(sitemap);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});