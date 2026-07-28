
const isProd = process.env.ELEVENTY_ENV === "production";

const excludeFromProdBuild = data => isProd && !!data.draft && data.draft;

module.exports = {
  eleventyComputed: {
    eleventyExcludeFromCollections: data => {
      return excludeFromProdBuild(data) ? true : data.eleventyExcludeFromCollections;
    },
    permalink: data => {
      if (excludeFromProdBuild(data)) {
        return false;
      }

      if (data.permalink) {
        return data.permalink;
      }

      let blogDate = data.page.date,
        year = blogDate.getUTCFullYear(),
        month = ('0' + (blogDate.getUTCMonth() + 1)).slice(-2),
        day = ('0' + (blogDate.getUTCDate())).slice(-2),
        slug = data.slug?.trim() || data.page.fileSlug;

      if (!slug) {
        throw new Error(`Unable to create a blog URL for ${data.page.inputPath}`);
      }

      return `/blog/${year}/${month}/${day}/${slug}/`;
    }
  },
  layout: "article.njk",
  showNewsletterForm: true,
}
