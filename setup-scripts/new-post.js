const fs = require("fs");
const slugify = require("slugify").default;
const { argv } = require("process");
const { exec } = require("child_process");

const postTitle = argv[2];
const newDir = `./src/blog/${slugify(postTitle, {
  lower: true
})}`;
const today = new Date();

const boilerplate = `---
title: "${postTitle}"
author: "Brian DeVries"
description: ""
date: ${today.getFullYear().toString()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString()}
tags: []
---
`;

if (!fs.existsSync(newDir)) {
  fs.mkdirSync(newDir, { recursive: true });
}

fs.writeFileSync(`${newDir}/index.md`, boilerplate);

exec(`code ${newDir}/index.md`);
