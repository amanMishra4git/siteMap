const siteMap = require('sitemap');
const urlModel = require('../Model/urlModel');

const generateSitemap = async (hostname) => {
  const urls = await urlModel.find({}, 'url -_id').exec();
  const sitemap = siteMap.createSitemap({
    hostname,
  });
  urls.forEach((url) => {
    sitemap.add({
      url: url.url,
      changefreq: 'weekly',
      priority: 0.5,
    });
  });
  return sitemap.toString();
};

module.exports = {
  generateSitemap,
};