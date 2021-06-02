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

module.exports.monthYear = date =>
  date instanceof Date
    ? toMonth.format(date) + " " + date.getUTCFullYear()
    : date;

module.exports.monthDate = date =>
  date instanceof Date ? toMonth.format(date) + " " + date.getUTCDate() : date;

module.exports.monthDateYear = date =>
  date instanceof Date
    ? toMonth.format(date) +
      " " +
      date.getUTCDate() +
      ", " +
      date.getUTCFullYear()
    : date;

module.exports.shortMonthDate = date =>
  date instanceof Date
    ? toMonth.format(date).substring(0, 3) +
      " " +
      date.getUTCDate().toString().padStart(2, "0")
    : date;
