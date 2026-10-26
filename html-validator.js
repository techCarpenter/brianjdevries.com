//Original code from blog post: https://sandroroth.com/blog/eleventy-html-validation

/** @type {import("html-validate").ConfigData} */
const validateConfig = {
    extends: ["html-validate:recommended"],
    elements: [
        "html5",
        {
            th: {
                attributes: {
                    scope: {
                        required: false
                    }
                }
            }
        }
    ],
    rules: {
        "no-trailing-whitespace": "off",
        "void-style": "off",
        "no-inline-style": "off",
        "long-title": "off",
        "no-raw-characters": "off",
        "wcag/h63": "off"
    }
};

import { HtmlValidate, StaticConfigLoader } from "html-validate";
const loader = new StaticConfigLoader(validateConfig);
const htmlValidate = new HtmlValidate(loader);
import fs from "fs";
import { green, red } from "kleur/colors";

export const results = {};

export function storeResults() {
    const resultFilePath = "./dist/html-validation.json";
    const totalErrors = Object.values(results)
        .filter(val => !!val)
        .reduce((acc, cur) => {
            return (acc = acc + cur.errorCount);
        }, 0);
    const totalFileCount = Object.values(results).filter(
        file => !!file
    ).length;
    const summary = {};

    summary["Total error count"] = totalErrors;
    summary["Files with errors"] = totalFileCount;
    summary["Results file path"] = resultFilePath;

    if (totalErrors > 0) {
        const content = JSON.stringify(results, null, 2);
        fs.writeFileSync(resultFilePath, content);

        console.table(summary);
    } else {
        console.log(green(`✅ No html errors!`));
    }
};

export function validate(content) {
    if (!this.outputPath) return;

    // Only validate 'html' files
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
    if (!validationResult.valid) {
        console.log(red(`❌ ${this.outputPath}`));
    }

    results[this.outputPath] = validationResult.valid
        ? undefined
        : validationResult;
};
