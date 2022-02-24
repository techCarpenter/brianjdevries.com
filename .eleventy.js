const fs = require("fs");

module.exports = function (config) {
  if (process.env.ELEVENTY_ENV === "development") {
    config.setBrowserSyncConfig({
      callbacks: {
        ready: function (err, bs) {
          bs.addMiddleware("*", (req, res) => {
            const content_404 = fs.readFileSync("dist/404.html");
            // Add 404 http status code in request header.
            res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
            // Provides the 404 content without redirect.
            res.write(content_404);
            res.end();
          });
        }
      }
    });
  }
  /* PLUGINS */
  config.addPlugin(require("@11ty/eleventy-navigation"));
  config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));

  /* SHORTCODES */
  config.addShortcode("navlist", require("./lib/shortcodes/navlist.js"));

  /* COLLECTIONS */
  config.addCollection("blog", function (collection) {
    return collection.getFilteredByGlob("./src/blog/**/*.md");
  });

  config.addCollection("notes", function (collection) {
    return collection.getFilteredByGlob("./src/notes/*.md");
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
  config.addFilter("shortmonthdateyear", dateformat.shortMonthDateYear);

  config.addPassthroughCopy({ "src/static": "/" });
  config.addPassthroughCopy({ "src/blog/**/*.jpg": "/images" });

  return {
    dir: {
      input: "src",
      output: "dist"
    },
    markdownTemplateEngine: "njk"
  };
};
