// const { SitemapStream } = require('sitemap');
// const { createGzip } = require('zlib');
// const Url = require('../Model/urlModel');
// const messages = require('../Constant/messages');
// const statusCode = require('../Constant/statusCodes');


// exports.generateSitemap = async (req, res) => {
//   try {
//     // Retrieve all URLs from MongoDB
//     const urls = await Url.find({});
    
//     if (urls.length === 0) {
//       return res.status(statusCode.statusCode.NotFound).send(messages.responseMessages.noURLs);
//     }

//     // Create sitemap stream and add URLs
//     const smStream = new SitemapStream({ hostname: 'https://google.com' });
//     const pipeline = smStream.pipe(createGzip());
//     urls.forEach((url) => {
//       smStream.write({ url: url.path });
//     });
//     smStream.end();

//     // Send sitemap as a gzip-compressed XML response
//     res.header('Content-Encoding', 'gzip');
//     res.header('Content-Type', 'application/xml');
//     pipeline.pipe(res);
//   } catch (err) {
//     console.error(err);
//     res.status(statusCode.statusCode.internaleServerErrorCode).end();
//   }
// };


const Url = require('../Model/urlModel');
const messages = require('../Constant/messages');
const statusCode = require('../Constant/statusCodes');

exports.generateSitemap = async (req, res) => {
  try {
    const urls = await Url.find({});
    
    if (urls.length === 0) {
      return res.status(statusCode.statusCode.NotFound).send(messages.responseMessages.noURLs);
    }

    // Construct the sitemap XML string
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    urls.forEach((url) => {
      xml += '<url>\n';
      xml += '<loc>' + url.path + '</loc>\n';
      xml += '</url>\n';
    });
    xml += '</urlset>';

    // Send sitemap as an XML response
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    console.error(err);
    res.status(statusCode.statusCode.internaleServerErrorCode).end();
  }
};