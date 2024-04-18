const fs = require("fs");
const slugify = require("slugify").default;
const { argv } = require("process");
const { exec } = require("child_process");
const dayjs = require("dayjs");

const dateFormat = dayjs().format("YYYY-MM-DD");
const postTitle = argv[2];
const now = new Date().toISOString();
const fileName = slugify(`${dateFormat}-${postTitle}`, {
  lower: true
});
const newFile = `./src/blog/${fileName}.md`;

const boilerplate = `---
title: "${postTitle}"
author: "Brian DeVries"
description: ""
tags: []
date: ${now}
draft: true
---
`;

fs.writeFileSync(newFile, boilerplate);

exec(`code ${newFile}`);
