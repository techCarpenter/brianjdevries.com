---
title: "Welcome"
description: "Brian DeVries's personal website. He writes occasionally on his blog and frequently updates his site with new information."
layout: page.njk
eleventyNavigation:
  key: Home
  order: 100
showNewsletterForm: false
---

<img class="profile-pic bounce-in"
  alt="Brian's face"
  title="That's me!"
  src="/images/brian-and-hannah.jpg"
  height="194"
  width="194" />

Hi, my name is Brian.

I've tried to categorize myself many times, but my interests cover a wide range: woodworking, sewing, programming, backpacking, and many more. The best way I can think to categorize myself is as a do-it-yourself guy who loves learning new things.

Having said that, I am a professional software engineer. My career transitioned in 2018 and I continue to write code to this day.

To learn more about me, check out [my about page](/about/). I also [write](/blog/) here on my site.

If you'd like to get notified of new posts, you can either subscribe to my [email newsletter](https://buttondown.email/briandevries/) or follow my blog's [feed](/feed.xml).

---

## Latest posts

<div style="display: flex; flex-direction: row; justify-content: flex-end; font-size: 1rem; color: var(--light-color)"><a class="button" href="/blog/">All Posts ➡</a></div>

{% from "./_includes/partials/latest-posts.njk" import latestPosts with context%}
{{ latestPosts(3) }}

---

## Latest notes

<div style="display: flex; flex-direction: row; justify-content: flex-end; font-size: 1rem; color: var(--light-color)"><a class="button" href="/notes/">All Notes ➡</a></div>

{% from "./_includes/partials/latest-notes.njk" import latestNotes with context%}
{{ latestNotes(3) }}

<script src="/scripts/dayjs.min.js"></script>
<script src="/scripts/dayjs-utc.js"></script>
<script>
  window.onload = function () {
    dayjs.extend(window.dayjs_plugin_utc);
    let dates = document.querySelectorAll(".note__time");
    dates.forEach(date => date.innerText = dayjs(new Date(date.getAttribute("datetime"))).format("HH:mm ddd MMM DD YYYY"));
  }
</script>