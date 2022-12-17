const listType = "ul",
  classActive = "active",
  classOpen = "open";

// pass in collections.all | eleventyNavigation, (current) page, and maximum depth level
module.exports = (pageNav, page, maxLevel = 999) => {
  function navRecurse(entry, level = 1) {
    let childPages = "";

    if (level < maxLevel) {
      for (let child of entry.children) {
        childPages += navRecurse(child, level++);
      }
    }

    let active = entry.url === page.url,
      classList = [];

    if (active) {
      classList.push(classActive);
      if (childPages) {
        classList.push(classOpen);
      }
    }

    const classListString = (classList.length ? ` class="${classList.join(" ")}"` : ""),
      anchorTitleAttr = (entry.title !== entry.key ? ` title="${entry.title}"` : ""),
      anchorHref = ` href="${entry.url}"`,
      anchorText = entry.key,
      childPageList = (childPages ? `<${listType}>${childPages}</${listType}>` : "");

    return `<li${classListString}><a${anchorTitleAttr}${anchorHref}>${anchorText}</a>${childPageList}</li>`;
  }

  let nav = "";
  for (let entry of pageNav) {
    nav += navRecurse(entry);
  }

  return nav;
};
