
const isProd = process.env.ELEVENTY_ENV === "production";

const excludeFromProdBuild = data => isProd && !!data.draft && data.draft;

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: data => {
      return excludeFromProdBuild(data) ? true : data.eleventyExcludeFromCollections;
    },
    permalink: data => {
      let blogDate = data.page.date,
        year = blogDate.getUTCFullYear(),
        month = ('0' + (blogDate.getUTCMonth() + 1)).slice(-2),
        day = ('0' + (blogDate.getUTCDate())).slice(-2);

      return excludeFromProdBuild(data) ? false : `/blog/${year}/${month}/${day}/${data.page.fileSlug}/`;
    }
  },
  layout: "article.njk",
  showNewsletterForm: true,
}