---
title: "What I'm doing now"
description: "What Brian DeVries is up to right now. This page is updated frequently so people can see the latest in my life."
layout: page.njk
lastModified: 2024-03-08
showNewsletterForm: false
---

Last updated: _{{ lastModified | dateformat("MMMM D, YYYY") }}_ <span id="edited-ago"></span>

---

- I'm working as a Software Engineer for [Meijer](https://meijer.com). I work remotely, but have been able to meet many of my coworkers since HQ is only 20 minutes away!
  - C#, SQL, and .NET
- Raising my ~~two~~ three sons (ages 5, 3, and 4 months) with my wife.
- Planning a garden for this coming warm season.
- Installing a gazebo over our back deck to add shade for hot summer days.

(Create your own [now page](https://nownownow.com/about))

<script>
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