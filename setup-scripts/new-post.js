import fs from "fs";
import slugify from "slugify";
import { argv } from "process";
// import { exec } from "child_process";
import dayjs from "dayjs";

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
