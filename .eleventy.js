module.exports = config => {
  // PLUGINS
  config.addPlugin(require("@11ty/eleventy-navigation"));

  // SHORTCODES
  config.addShortcode("navlist", require("./lib/shortcodes/navlist.js"));

  // blog collection (in src/blog)
  config.addCollection("blog", collection =>
    collection.getFilteredByGlob("./src/blog/**/*.md")
  );

  // FILTERS

  // format dates
  const dateformat = require("./lib/filters/dateformat");
  config.addFilter("datefriendly", dateformat.friendly);
  config.addFilter("dateymd", dateformat.ymd);
  config.addFilter("datemonthyear", dateformat.monthYear);

  config.addPassthroughCopy({"src/static": "/"})

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
