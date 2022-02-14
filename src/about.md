---
title: "About me"
description: "I'm Brian DeVries, a software developer living in West Michigan. I'm originally from Loveland, Colorado."
layout: "page.njk"
eleventyNavigation:
  key: "About"
  order: 200
---

<img class="profile-pic bounce-in"
  alt="Brian's headshot photo"
  title="That's me!"
  height="200"
  width="200"
  src="/images/BrianProfilePic.jpg" />

### Howdy!

I'm Brian DeVries. Thanks for stopping by, I'm glad you're here!

Let me share a bit about myself and my career.

## Some Background

I was introduced to programming during my sophomore year of college (2014).

At the time I was working toward a Bachelor's Degree in Electrical Engineering.

I enjoyed it but saw my engineering degree through to the end and started my engineering career.

I graduated with ~$80,000 in student loans (not including my wife's...). Once the student loan payments started in the fall of 2017, I felt enslaved.

I could afford the payments, but I was staring down the barrel of a 20+ year payback period if I didn't do something about it.

My solution was to start a side hustle to make extra money to put towards paying back loans.

I tried all kinds of things.

- Selling homemade bottle openers.
- Candle making.
- Wax seals.
- Freelance engineering.
- Working as a handyman.

The results were always the same. I'd make little-to-no money and get frustrated working extra time for nothing.

## Things Start To Change

One year into my career (2018), I landed a job where I wrote a little software to interface with the circuits I was building. I was stoked!

But another year after that, I felt drained by the hardware part of my job.

I was less interested in the electrical engineering aspect, but I **loved** the programming.

And I was still trying to find a way to make money on the side.

My wife asked, "_Why don't you try to do a side hustle with programming?_"

### This was a turning point for me.

I knew enough about software to be dangerous. So rather than just doing something on the side, why couldn't I become a full-time software developer?

Writing software again brought back all the excitement I originally had experienced back in college.

I was interested in web development. I found tutorials and courses to learn how to build websites through online resources.

Almost 3 years out of college, I transitioned from engineering into a full time software programming job.

Now I'm able to pay more towards my student loans and save more money doing the thing I love to do.

## Why I Created This Site

Since I've graduated college, I've learned a lot about programming, self-improvement, money management, habit building, and more.

I started this website to share what I've learned on my journey. I want to inspire others to take action and better themselves.

[Let's talk!](/contact) I love hearing from readers. And if you'd like to learn about something I haven't written about, I'm open to suggestions.

## Nice things people say

<!-- List testimonials -->
{% for tml in testimonials %}
  <figure class="testimonial">
    <blockquote class="testimonial-quote">“{{tml.testimonial}}”</blockquote>
    <figcaption class="testimonial-caption">
      —<strong>{{tml.name}}</strong>, {{tml.title}}, <a href="{{tml.company.url}}" rel="noreferrer nofollow">{{tml.company.name}}</a>
    </figcaption>
  </figure>
{% endfor %}

<style>
  .testimonial {
    margin: 2.5rem 0;
  }
  .testimonial-quote {
    margin: 0;
  }
  .testimonial-caption {
    margin-top: 0.75rem;
  }
</style>