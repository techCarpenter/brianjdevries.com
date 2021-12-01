---
title: "Hosting a static website"
author: "Brian DeVries"
description: ""
date: 2021-09-14
---

Hosting a static website can feel daunting the first time you set it up. My experience involved reading multiple posts and learning about several pieces of web infrastructure that are complex. We're going to walk through how to host a static website. Let's get started!

## 1

The 3 fundamental pieces of every website are HTML, CSS, and Javascript. All websites consist of these 3 components. How they are generated can differ, but by the time the site is live, it will be presented using those 3 pieces.

The evolution of the web is another topic. But in short, it started as statically typed files that were hosted on a server. Then a url was associated with those files, giving it an address for anyone to view those files in the browser. As time went on, more dynamic methods were used, involving backend processing.

With the rise of microservices, platforms like Netlify, and static site generators, static sites have been making a comeback. Alright, enough back story. We'll start with how your site is made.

## 2

To get a static site built, you can write plain HTML, CSS, and Javascript files. However, this isn't the most efficient way to build a site. Static site generators (SSGs) make it possible to use templates and reuse pieces of markup without repeating the same code over and over.

If you're familiar with a programming language, I recommend finding a SSG that you can use to generate your site. There isn't anything wrong with writing plain files though. It will be less scalable, but a great learning experience if you're just starting out.

Once your site is built locally, there a few things to consider next.

1. Source control
2. Hosting platform
3. Domain name registration

Source control is often required for hosting with platforms like Netlify. They need access to the source code to build or host the pages and expose them to the web.

GitHub is the most commonly used git service. It can be accessed by Netlify and deploy branches of your project with a few clicks.

Typically, hosting is provided as a service rather than operating your own server. It makes it much easier to get started! I use Netlify or GitHub pages to host my static sites.

Domain name registration is only necessary if you want a custom web address. My personal website is <brianjdevries.com>. I had to register that domain name. Otherwise Netlify will give me a sub-domain, i.e. <brianjdevries.netlify.app>.

## Source control

Learning git is outside the scope of this post, but GitHub will allow you to push your code to a repository and deploy your site.

Sign up for a GitHub account, create a new repository, and follow the instructions provided for your project.

Once your code is in a GitHub repo, it's time to set up your site hosting (Yay! 😄)

## Hosting provider

Hosting with Netlify is a cinch. Once you sign up, you'll need to connect your GitHub account.

Choose the main branch for you deployment and specify the build command if you're using a SSG. Otherwise if you're hosting static files, you can simply specify the output directory.

Netlify should be able to do the rest! A new link will be generated for you with your site visible to the public. Congrats on hosting your first website!

## Domain name registration

Lastly, getting a domain name can seem like a scary next step. However, they're often inexpensive ($12/year) and create a home for all your future work. You also control that domain and all the content hosted under it.

There are many DNRs to choose from: GoDaddy, NameCheap, Google Domains, etc. I am currently using Google Domains, but the process is similar on all of them.

Start by searching for a domain that makes sense for you. Mine is just my name, but it can be centered around a topic for a blog or really anything you want. I recommend some variation of your name for a personal site though.

The option to choose the ???ending of the domain can be overwhelming at first. `.com`, `.dev`, `.io`, or `.org`? Typically choosing a `.com` is what most people recommend. However, this is becoming less relevant as more people adopt the new domain endings.

Once you've selected a domain, it needs to be connected to your hosted site. This can be done by modifying DNS records for the domain and pointing the domain to the Netlify servers.

I'll walk you through how to set up the DNS records and you'll be off to the races!

---

I'd like to talk a bit about why I think it's important to have your own website. It's not something that most people have, but will be important as things move more online.

It acts as a home base for information about you! If anyone wants to keep up with you, they can visit your website. There you could have a `/contact` page. Or maybe you have a `/now` page where you share your current endeavors and goals. You can write about yourself for new friends to learn about who you are and where you came from.

Employers are often intrigued to learn you have your own website. (especially if you're not in the tech world!)

I even have a `/resume` page that outlines my work experience similar to how LinkedIn does so that I can always have a home for summaries about past work.

Owning the home of your content is the important part. You won't have your sub-domain ripped from your hands if you own the domain. There are countless examples of sub-domains being taken and never given back.

This is just my limited knowledge of what a website can do for you. If you have comments or questions, please share so we can discuss further! If you're not technically savvy, other routes my be more aligned with your goals such as WordPress hosting. The hosting cost will likely be higher, but you'll be able to customize the style of your site without writing code 😉

That's all for this morning, time to do devotions and get the boys up for the day!
