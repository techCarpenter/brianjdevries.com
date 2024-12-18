---
title: "What I'm doing now"
description: "What Brian DeVries is up to right now. This page is updated frequently so people can see the latest in my life."
layout: page.njk
eleventyNavigation:
  key: "Now"
  title: "What Brian is doing now"
  order: 400
lastModified: 2024-12-18
showNewsletterForm: false
---

Last updated: _{{ lastModified | dateformat("MMMM D, YYYY") }}_ <span id="edited-ago"></span>

Create your own [now page](https://nownownow.com/about), or [reach out](/contact/) if you want help getting your own site up and running!

---

- I'm working as a Software Engineer for [Meijer](https://meijer.com). I work remotely, but have been able to meet many of my coworkers since HQ is only 20 minutes away.
  - C#, SQL, and .NET
- Building websites for clients at [techcarpenter.org](https://techcarpenter.org/)
- Raising my three sons (ages 6, 4, and 1) with my wife.
- Running a self-hosted server on my local network.
- Doing lots of puzzles, melting bead patterns, wrestling, and reading books with my boys.
- My wife and I just started playing a game together called _It Takes Two_, so far we're really enjoying it on chill evenings!

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