---
title: "Welcome"
description: "Brian DeVries's personal website. He writes occasionally on his blog and frequently updates his site with new information."
layout: page.njk
eleventyNavigation:
  key: Home
  order: 100
showNewsletterForm: false
---

Hi, my name is Brian.

I've tried to categorize myself many times, but my interests cover a wide range: woodworking, sewing, programming, backpacking, and many more. The best way I can think to categorize myself is as a do-it-yourself guy who loves learning new things.

Having said that, I am a professional software engineer. My career transitioned in 2018 and I continue to write code to this day.

To learn more about me, check out [my about page](/about/). I also [write](/blog/) here on my site.

If you'd like to get notified of new posts, you can either subscribe to my [email newsletter](https://buttondown.email/briandevries/) or follow my blog's [feed](/feed.xml).

---

## Latest posts

{% from "./_includes/partials/latest-posts.njk" import latestPosts with context%}
{{ latestPosts(3) }}
