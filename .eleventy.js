const moment = require('moment');
const Title = require(`./_includes/components/Title.js`);
const Time = require(`./_includes/components/Time.js`);

moment.locale('en');

module.exports = function (eleventyConfig) {

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).format('MMM').toUpperCase()+moment(date).format('YYYY');
  });

  eleventyConfig.addFilter('dateFormat', ( date, format ) => {
    return moment(date).format(format)
  });

  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));
  eleventyConfig.addShortcode('remainingWords', article => remainingWords(article));

  eleventyConfig.addShortcode('Title', Title);
  eleventyConfig.addShortcode('Time', Time);

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('*.css');
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];

  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.lastIndexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}

function remainingWords(article) {
  const excerpt = extractExcerpt(article);
  console.log(100 - (excerpt.split(' ').length));
  return "" + (100 - (excerpt.split(' ').length));
}
