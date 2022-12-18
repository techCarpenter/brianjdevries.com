---
title: "Start Here"
description: "Brian DeVries's personal website. He writes occasionally on his blog and frequently updates his site with new information."
layout: page.njk
eleventyNavigation:
  key: Home
  order: "100"
showNewsletterForm: false
---

<img class="profile-pic bounce-in"
  alt="Brian's headshot photo"
  title="That's me!"
  src="/images/goofy-profile-pic.png"
  height="194"
  width="194" />

Hi there! My name's Brian. I've tried to categorize myself many times, but my interests cover a wide range: woodworking, sewing, programming, backpacking, and many more. The best way I can think to categorize myself is as a do-it-yourself guy who loves learning new things.

Having said that, I am a professional software engineer. My career transitioned in 2018 and I haven't looked back.

To read more about who I am, check out [my about page](/about/).

I also write occasionally on [my blog](/blog/).

## Latest posts

<ol class="posts">
{% set count = 0 %}
{% for blog in collections.blog %}
{% if count < 3 %}
<li class="post">
<div><a class="post-link" href="{{blog.url}}">{{blog.data.title}}</a></div>
<div class="date">
  <time datetime="{{ blog.date | dateformat('YYYY-MM-DD') }}">{{ blog.date | dateformat("MMM DD, YYYY") }}</time>
</div>
</li>
{% set count = count + 1 %}
{% endif %}
{% endfor %}
</ol>
