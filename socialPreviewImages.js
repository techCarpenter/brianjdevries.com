const fs = require("fs");
const Image = require("@11ty/eleventy-img");
const {yellow} = require("kleur");

module.exports = function () {
	const socialPreviewImagesDir = "dist/images/social-preview-images/";
	fs.readdir(socialPreviewImagesDir, (err, files) => {
		if (!!files && files.length > 0) {
			files.forEach(fileName => {
				if (fileName.endsWith(".svg")) {
					let imageUrl = socialPreviewImagesDir + fileName;
					Image(imageUrl, {
						formats: ["jpeg"],
						outputDir: "./" + socialPreviewImagesDir,
						filenameFormat: function (id, src, width, format, options) {
							let outputFileName = fileName.substring(0, fileName.length - 4);
							return `${outputFileName}.${format}`;
						}
					});
				}
			});
		} else {
			console.log(yellow("⚠ No social images found"));
		}
	});
};
