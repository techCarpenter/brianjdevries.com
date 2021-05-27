// date formatting functions
const toMonth = new Intl.DateTimeFormat("en", { month: "long" });

// format a date to YYYY-MM-DD
module.exports.ymd = date =>
  date instanceof Date
    ? `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getUTCDate()).padStart(2, "0")}`
    : "";

// format a date to DD MMMM, YYYY
module.exports.friendly = date =>
  date instanceof Date
    ? date.getUTCDate() +
      " " +
      toMonth.format(date) +
      ", " +
      date.getUTCFullYear()
    : "";

module.exports.monthYear = date =>
  date instanceof Date ? toMonth.format(date) + " " + date.getFullYear() : date;

module.exports.monthDate = date =>
  date instanceof Date ? toMonth.format(date) + " " + date.getDate() : date;