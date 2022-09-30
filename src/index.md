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

Hi there! My name's Brian. I've tried to categorize myself many times, but my interests cover a wide range: woodworking, sewing, programming, backpacking, and many more. The best way I can think to categorize myself is as a do-it-yourself guy who loves learning new things.

Having said that, I am a professional software engineer. My career transitioned in 2018 and I haven't looked back.

To read more about who I am, check out [my about page](/about/).

I also write occasionally on [my blog](/blog/).

## Latest articles

<ol class="posts">
{% set count = 0 %}
{% for blog in collections.blog | reverse %}
{% if blog.url != "/blog" and count < 3 %}
<li style="display: flex; justify-content: space-between;" class="post">
<div><a class="post-link" href="{{blog.url}}">{{blog.data.title}}</a></div>
<div style="float: right;" class="date">{{ blog.date | dateformat("MMM DD, YYYY") }}</div>
</li>
{% set count = count + 1 %}
{% endif %}
{% endfor %}
</ol>
