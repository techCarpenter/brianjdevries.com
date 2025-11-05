---
title: "What I'm doing now"
description: "What Brian DeVries is up to right now. This page is updated frequently so people can see the latest in my life."
layout: page.njk
eleventyNavigation:
  key: "Now"
  title: "What Brian is doing now"
  order: 400
lastModified: 2025-11-05
showNewsletterForm: false
---

**Last updated:** _{{ lastModified | dateformat("MMMM D, YYYY") }}_ <span id="edited-ago"></span>

---

- I'm working as a Software Engineer for [Meijer](https://meijer.com). I work remotely, but have been able to meet many of my coworkers since HQ is only 20 minutes away.
  - C#, SQL, and .NET
- Building websites for clients at [techcarpenter.org](https://techcarpenter.org/)
- Raising my three sons (ages 7, 5, and 2) with my wife.
  - Expecting my fourth son to arrive in late January 2026!
- Running a self-hosted server on my local network.
- I've been working on several cross-stitch designs. Some I've given away as gifts, others I'm making for myself.
  - My two oldest sons have shown some interest in learning so I've been teaching then to cross-stitch too! 🧵🪡
- Doing lots of puzzles, melting bead patterns, wrestling, and reading books with my boys.

---

Create your own [now page](https://nownownow.com/about), or [reach out](/contact/) if you want help getting your own site up and running!

<script>
  //Progressive Enhancement
  let daysSince = {value: (new Date() - new Date("{{lastModified.toISOString().split("T")[0]}}T00:00:00.000")) / (60 * 60 * 1000 * 24), unit: "day" };
  let weeksSince = {value: daysSince.value / 7, unit: "week"};
  let monthsSince = {value: weeksSince.value / (52/12), unit: "month"};
  let yearsSince = {value: daysSince.value / 365, unit: "year"};
  let retVal = daysSince;

  if (daysSince.value >= 7) { retVal = weeksSince }
  if (weeksSince.value >= 8) { retVal = monthsSince }
  if (monthsSince.value >= 12) { retVal = yearsSince }

  let text = retVal.unit === 'day' && retVal.value < 1 ? 'Today' : `${parseInt(retVal.value)} ${retVal.unit}${parseInt(retVal.value) > 1 ? "s" : ""} ago`;

  let editedAgo = document.querySelector("#edited-ago");
  editedAgo.textContent = `(${text})`;
</script>
