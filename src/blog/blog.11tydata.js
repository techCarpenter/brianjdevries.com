
const isProd = process.env.ELEVENTY_ENV === "production";

const excludeFromProdBuild = data => isProd && !!data.draft && data.draft;

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: data => {
      return excludeFromProdBuild(data) ? true : data.eleventyExcludeFromCollections;
    },
    permalink: data => {
      return excludeFromProdBuild(data) ? false : `/blog/${data.page.fileSlug}/`;
    }
  },
  layout: "article.njk",
  showNewsletterForm: true,
}