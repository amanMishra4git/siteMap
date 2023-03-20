// const siteMap = require('sitemap');
// const urlModel = require('../Model/urlModel');

// const generateSitemap = async (hostname) => {
//   const urls = await urlModel.find({}, 'url -_id').exec();
//   const sitemap = siteMap.createSitemap({
//     hostname,
//   });
//   urls.forEach((url) => {
//     sitemap.add({
//       url: url.url,
//       changefreq: 'weekly',
//       priority: 0.5,
//     });
//   });
//   return sitemap.toString();
// };

// module.exports = {
//   generateSitemap,
// };

const { SitemapStream } = require('sitemap');
const { createGzip } = require('zlib');
const Url = require('../Model/urlModel');
const messages = require('../Constant/messages');
const statusCode = require('../Constant/statusCodes');


exports.generateSitemap = async (req, res) => {
  try {
    // Retrieve all URLs from MongoDB
    const urls = await Url.find({});
    
    if (urls.length === 0) {
      return res.status(statusCode.statusCode.NotFound).send(messages.responseMessages.noURLs);
    }

    // Create sitemap stream and add URLs
    const smStream = new SitemapStream({ hostname: 'https://google.com' });
    const pipeline = smStream.pipe(createGzip());
    urls.forEach((url) => {
      smStream.write({ url: url.path });
    });
    smStream.end();

    // Send sitemap as a gzip-compressed XML response
    res.header('Content-Encoding', 'gzip');
    res.header('Content-Type', 'application/xml');
    pipeline.pipe(res);
  } catch (err) {
    console.error(err);
    res.status(statusCode.statusCode.internaleServerErrorCode).end();
  }
};