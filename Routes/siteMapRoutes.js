// const express = require('express');
// const sitemapController = require('../Controller/siteMapController');
// const messages = require('../Constant/messages');
// const statusCode = require('../Constant/statusCodes');

// const router = express.Router();

// router.get('/', async (req, res) => {
//   try {
//     const sitemapXml = await sitemapController.generateSitemap('https://urspayce.com');
//     res.set('Content-Type', 'application/xml');
//     res.send(sitemapXml);
//   } catch (error) {
//     res.status(statusCode.statusCode.internaleServerErrorCode).send(messages.responseMessages.errGeneratingSitemap);
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const sitemapController = require('../Controller/siteMapController');

router.get('/sitemap.xml', sitemapController.generateSitemap);

module.exports = router;