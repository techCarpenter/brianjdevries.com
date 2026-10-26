import * as htmlValidator from "./html-validator.js";
import navigation from "@11ty/eleventy-navigation";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import rss from "@11ty/eleventy-plugin-rss";
import navlist from "./lib/shortcodes/navlist.js";
import dateformat from "./lib/filters/dateformat.js";
import slugify from "./lib/filters/slugify.js";
import splitLines from "./lib/filters/splitLines.js";
import socialPreviewImages from "./socialPreviewImages.js";
import markdownIt from "markdown-it";

export default function (config) {
    const md = new markdownIt({
        html: true
    });
    const defaultImageRenderer = md.renderer.rules.image || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options);
    };

    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];

        token.attrSet("loading", "lazy");
        token.attrSet("decoding", "async");

        return defaultImageRenderer(tokens, idx, options, env, self);
    };

    if (process.env.ELEVENTY_ENV === "development") {
        config.on("eleventy.after", htmlValidator.storeResults);
        config.addLinter("html-validator", htmlValidator.validate);
    }

    config.addPlugin(navigation);
    config.addPlugin(syntaxHighlight);
    config.addPlugin(rss);

    config.addShortcode("navlist", navlist);

    function getPosts(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/blog/*.md").reverse();
    }
    function getNotes(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/notes/*.md").reverse();
    }

    config.addCollection("blog", function (collection) {
        return getPosts(collection);
    });
    config.addCollection("notes", function (collection) {
        return getNotes(collection);
    });

    config.addFilter("dateformat", dateformat);
    config.addFilter("markdown", content => md.render(content));
    config.addFilter("slugify", slugify);
    config.addFilter("splitlines", splitLines);
    config.setLibrary("md", md);

    config.addPassthroughCopy({ "src/static": "/" });
    config.addPassthroughCopy({ "node_modules/dayjs/dayjs.min.js": "/scripts/dayjs.min.js" })
    config.addPassthroughCopy({ "node_modules/dayjs/plugin/utc.js": "/scripts/dayjs-utc.js" })

    config.on("eleventy.after", socialPreviewImages);

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        markdownTemplateEngine: "njk"
    };
};
