---
title: Start Here
description: Brian DeVries's personal website.
layout: page.njk
eleventyNavigation:
  key: Home
  order: "100"
showNewsletterForm: false
---

<img class="profile-pic bounce-in"
  alt="Brian's headshot photo"
  title="That's me!"
  src="/images/BrianProfilePic.jpg"
  height="194"
  width="194" />

Hi there! My name's Brian. I make things on the interwebs. More specifically, I'm a software engineer who builds full stack web applications and websites. I've been programming professionally since 2018 and love what I do!

You can learn more about the type of work I do on my [about page](/about).

I also occasionally write articles on [my blog](/blog).

## Recent articles

<ol class="posts">
{% set count = 0 %}
{% for blog in collections.blog | reverse %}
{% if blog.url != "/blog" and count < 3 %}
<li class="post">
<span class="date">{{ blog.date | monthdateyear }}</span>
<a class="post-link" href="{{blog.url}}">{{blog.data.title}}</a>
</li>
{% set count = count + 1 %}
{% endif %}
{% endfor %}
</ol>
