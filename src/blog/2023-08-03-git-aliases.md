---
title: "Creating Git Aliases"
author: "Brian DeVries"
description: "The syntax to create a git alias from the command line."
tags: []
date: 2023-08-03
draft: true
---

- [general structure of function for git alias](https://www.atlassian.com/engineering/advanced-git-aliases#:~:text=Cleanup%20merged%20branches)
- [don't omit trailing semicolon in function](https://unix.stackexchange.com/a/239510)

```shell
git config --global alias.noremote "! ddd() { git branch -vv | grep ': gone]' |  grep -v '*' | awk '{ print $1; }' | xargs -r git branch -d; }; ddd"
```
