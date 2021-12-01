module.exports = function (config) {
  /* PLUGINS */
  config.addPlugin(require("@11ty/eleventy-navigation"));
  config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  /* SHORTCODES */
  config.addShortcode("navlist", require("./lib/shortcodes/navlist.js"));

  /* COLLECTIONS */
  config.addCollection("blog", function (collection) {
    return collection.getFilteredByGlob("./src/blog/**/*.md");
  });

  config.addCollection("notebook", function (collection) {
    return collection.getFilteredByGlob("./src/notebook/*.md");
  });

  config.addCollection("workHistory", function (collection) {
    return collection
      .getFilteredByGlob("./src/work-history/*.md")
      .sort(function (a, b) {
        return a.data.startDate - b.data.startDate;
      });
  });

  config.addCollection("projects", function (collection) {
    return collection
      .getFilteredByGlob("./src/projects/*.md")
      .sort(function (a, b) {
        return a.data.startDate - b.data.startDate;
      });
  });

  /* FILTERS */

  // format dates
  const dateformat = require("./lib/filters/dateformat");
  config.addFilter("dateymd", dateformat.ymd);
  config.addFilter("datemonthyear", dateformat.monthYear);
  config.addFilter("datemonthdate", dateformat.monthDate);
  config.addFilter("monthdateyear", dateformat.monthDateYear);
  config.addFilter("shortmonthdate", dateformat.shortMonthDate);

  config.addPassthroughCopy({ "src/static": "/" });

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
