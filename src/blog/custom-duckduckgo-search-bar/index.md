---
title: "How to add a custom search bar to your eleventy website with duckduckgo"
author: "Brian DeVries"
description: "Site search is convenient for visitors, but not always easy to implement. Duckduckgo offers url parameters to customize the search results look and feel so you can make your own custom site search bar."
date: 2022-10-16
tags: [html]
---

A few weeks ago, I was sprucing up my website's "404 Not Found" page. I had seen some useful 404 pages that offered other web pages to check out instead of just a dead end. One addition I thought would be nice is a custom search bar. It turned out to be effortless with DuckDuckGo.

## Customize results page

Duckduckgo offers several query parameters that affect the search results of the page. Go here to find the [full list of query parameters](https://help.duckduckgo.com/settings/params/).

Here are the parameters I'm interested in:

1. **search**: The search term, entered by the user.
2. **sites**: The website to search (my website).
3. **kx**: The URL color on the search results page.
4. **ko**: Control search results header.
5. **kaa**: Results page visited link color.
6. **k1**: Control ads on search results page.
7. **k7**: Results page background color.
8. **k8**: Results page text color.
9. **k9**: Results page link color.

Each of these parameters can be represented by a hidden input within a `form` element as shown below.

```html
<form action="https://duckduckgo.com/" method="GET">
  <input type="search" name="q" id="search-term" class="search-txt" autocomplete="off" autofocus placeholder="i.e. work experience" >
  <input aria-hidden="true" type="hidden" hidden name="sites" value="brianjdevries.com">
  <input aria-hidden="true" type="hidden" hidden name="kx" value="#777777">
  <input aria-hidden="true" type="hidden" hidden name="k7" value="#040404">
  <input aria-hidden="true" type="hidden" hidden name="k8" value="#cccccc">
  <input aria-hidden="true" type="hidden" hidden name="k9" value="#e03021">
  <input aria-hidden="true" type="hidden" hidden name="ko" value="-2">
  <input aria-hidden="true" type="hidden" hidden name="k1" value="-1">
  <input aria-hidden="true" type="hidden" hidden name="kaa" value="#777777">
  <button type="submit">Search</button>
</form>
```

Most of the input fields have a set value. Only the `input type="search"` element will take custom input (the search terms). All the hidden inputs will be appended to the form url as query parameters when the form is submitted.

The form appears as a simple text box with a search button.

<img alt="Custom search bar in action" src="/images/live-search-bar.jpg" height="298" width="560" />

## Adding the form in eleventy

The above steps can be implemented on any website. To add the search bar to my eleventy site, I created a nunjucks template for it. It simply comtains the previous `form` element with all the inputs.

After that, simply include the template wherever you want it to render.

```nunjucks
{% include "partials/search-box.njk" %}
```

## Conclusion

Yes, it really is that easy. There are other ways to solve the onsite search problem, but this is my solution for now. I hope you found this helpful!

P.S. I also found a nifty tool that [generates a duckduckgo search bar](https://patdryburgh.com/blog/adding-a-custom-duckduckgo-search-bar-to-your-site/) for you. Give it a try or create your own from scratch.
