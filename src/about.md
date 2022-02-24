---
title: "About me"
description: "I'm Brian DeVries, a software developer living in West Michigan. I'm originally from Loveland, Colorado."
layout: "page.njk"
eleventyNavigation:
  key: "About"
  order: 200
showNewsletterForm: false
---

<img class="profile-pic bounce-in"
  alt="Brian's headshot photo"
  title="That's me!"
  height="194"
  width="194"
  src="/images/BrianProfilePic.jpg" />

I'm Brian DeVries, a JavaScript/TypeScript and .NET developer who's been shipping code since 2018.

Here are some things I've done in that time:

- Integrated a preventive maintenance tracker with the internal wiki at [Gentex](https://www.gentex.com)
- Wrote .NET applications to test physical HomeLink garage door openers and auto-dimming rear view mirrors at [Gentex](https://www.gentex.com)
- Received a SAFe Agile Practitioner certification (scrum, kanban, product owners, etc.)
- Completed 3 [FreeCodeCamp](https://freecodecamp.org) certifications
- Built multiple APIs to expose database procedures to 3rd party vendors at [Meijer](https://www.meijer.com)
- Helped port a Windows Forms desktop app to a Vue webapp for [Life Storage](https://lifestorage.com)
- Set up my own DNS server with a Raspberry Pi
- Contributed to the open source project Foam ([pull request #865](https://github.com/foambubble/foam/pull/865))
- Designed and developed two client websites: [Professional Turf Solutions](/projects/pro-turf-solutions) and [Anna's dog grooming](https://annasdoggrooming.netlify.app)

Other personal project details can be found on my [project page](/projects) and on [github](https://github.com/techcarpenter).

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

If you think I can help you with a project, [get in touch](/contact).

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