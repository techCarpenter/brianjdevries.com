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

						/**
						 * Add 404 http status code in request header.
						 */
						res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });

						res.write(content_404);
						res.end();
					});
				}
			}
		});

		config.on("eleventy.after", htmlValidator.storeResults);
		config.addLinter("html-validator", htmlValidator.validate);
	}

	config.addPlugin(require("@11ty/eleventy-navigation"));
	config.addPlugin(require("@11ty/eleventy-plugin-syntaxhighlight"));
	config.addPlugin(require("@11ty/eleventy-plugin-rss"));

	config.addShortcode("navlist", require("./lib/shortcodes/navlist.js"));

	function getPosts(collectionApi) {
		return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
	}

	config.addCollection("blog", function (collection) {
		return getPosts(collection);
	});

	config.addFilter("dateformat", require("./lib/filters/dateformat"));
	config.addFilter("markdown", content => md.render(content));
	config.addFilter("slugify", require("./lib/filters/slugify"));
	config.addFilter("splitlines", require("./lib/filters/splitLines"));

	config.addPassthroughCopy({ "src/static": "/" });

	config.on("eleventy.after", require("./socialPreviewImages"));

	return {
		dir: {
			input: "src",
			output: "dist"
		},
		markdownTemplateEngine: "njk"
	};
};
