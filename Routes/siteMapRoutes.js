const express = require('express');
const router = express.Router();
const sitemapController = require('../Controller/siteMapController');

router.get('/sitemap.xml', sitemapController.generateSitemap);

module.exports = router;