module.exports = {
  eleventyComputed: {
    permalink: data => {
      let date = data.page.date,
        year = date.getUTCFullYear(),
        month = (date.getUTCMonth() + 1).toString().padStart(2, "0"),
        day = date.getUTCDate().toString().padStart(2, "0"),
        hours = date.getUTCHours().toString().padStart(2, "0"),
        minutes = date.getUTCMinutes().toString().padStart(2, "0"),
        seconds = date.getUTCSeconds().toString().padStart(2, "0");

      return `/notes/${year}${month}${day}${hours}${minutes}${seconds}`;
    }
  },
  title: "Notes",
  layout: "notePage.njk",
  showNewsletterForm: false,
}