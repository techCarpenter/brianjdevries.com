const fs = require("fs");
const Image = require("@11ty/eleventy-img");
const {yellow} = require("kleur");

module.exports = async function () {
    const socialPreviewImagesDir = "dist/images/social-preview-images/";
    const files = await fs.promises.readdir(socialPreviewImagesDir);
    const svgFiles = files.filter(fileName => fileName.endsWith(".svg"));

    if (svgFiles.length === 0) {
        console.log(yellow("⚠ No social images found"));
        return;
    }

    await Promise.all(svgFiles.map(fileName => {
        const imageUrl = socialPreviewImagesDir + fileName;

        return Image(imageUrl, {
            formats: ["jpeg"],
            outputDir: "./" + socialPreviewImagesDir,
            useCache: false,
            filenameFormat: function (id, src, width, format, options) {
                const outputFileName = fileName.substring(0, fileName.length - 4);
                return `${outputFileName}.${format}`;
            }
        });
    }));
};
