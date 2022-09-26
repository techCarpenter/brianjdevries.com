//Original code from blog post: https://sandroroth.com/blog/eleventy-html-validation

const { HtmlValidate, StaticConfigLoader } = require("html-validate");
const loader = new StaticConfigLoader({
	extends: ["html-validate:recommended"],
	rules: {
		"no-trailing-whitespace": "off",
		"void-style": "off",
		"no-inline-style": "off",
		"long-title": "off"
	}
});
const htmlValidate = new HtmlValidate(loader);
const fs = require("fs");

exports.results = {};

exports.storeResults = function storeResults() {
	const totalErrors = Object.values(exports.results)
		.filter(val => !!val)
		.reduce((acc, cur) => {
			return (acc = acc + cur.errorCount);
		}, 0);
	console.log("Total Errors: ", totalErrors);
	const content = JSON.stringify(exports.results, null, 2);
	fs.writeFileSync("dist/html-validation.json", content);
};

exports.validate = function validate(content) {
	if (!this.outputPath) return;
	if (this.outputPath.split(".").pop() !== "html") return;

	const validationResult = htmlValidate.validateString(content);
	const lines = content.split(/\r?\n/);
	validationResult.results.forEach(result => {
		result.filePath = this.outputPath;
		result.messages.forEach(message => {
			// @ts-ignore
			message.codeLines = lines.slice(
				// Three lines before + actual line
				Math.max(message.line - 4, 0),
				// Three lines after
				message.line + 3
			);
		});
	});
	console.log(`${validationResult.valid ? "✅" : "❌"} ${this.outputPath}`);

	exports.results[this.outputPath] = validationResult.valid
		? undefined
		: validationResult;
};
