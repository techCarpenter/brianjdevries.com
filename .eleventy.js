const fs = require("fs");
const htmlValidator = require("./html-validator");
const markdownIt = require("markdown-it");

module.exports = function (config) {
	const md = new markdownIt({
		html: true
	});

	if (process.env.ELEVENTY_ENV === "development") {
		/**
		 * Required during development to show 404 page
		 * when path doesn't exist
		 */
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

		/* HTML VALIDATION */
		/**
		 * Only run html validation in development mode
		 */
		config.on("eleventy.after", htmlValidator.storeResults);
		config.addLinter("html-validator", htmlValidator.validate);
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

	/* FILTERS */

	// format dates
	config.addFilter("dateformat", require("./lib/filters/dateformat"));
	config.addFilter("markdown", content => md.render(content));
	config.addFilter("slugify", require("./lib/filters/slugify"));
	config.addFilter("splitlines", require("./lib/filters/splitLines"));

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
