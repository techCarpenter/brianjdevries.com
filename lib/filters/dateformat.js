// month string i.e. "January"
const toMonth = new Intl.DateTimeFormat("en", { month: "long" }).format;

/**
 * Format a date i.e. "2022-12-24"
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
module.exports.ymd = date =>
  date instanceof Date
    ? `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getUTCDate()).padStart(2, "0")}`
    : "";

/**
 * Format a date i.e. "January 2022"
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
module.exports.monthYear = date =>
  date instanceof Date
    ? toMonth(date) + " " + date.getUTCFullYear()
    : date;

/**
 * Format a date i.e. "January 4"
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
module.exports.monthDate = date =>
  date instanceof Date ? toMonth(date) + " " + date.getUTCDate() : date;

/**
 * Format a date i.e. "January 20, 2022"
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
module.exports.monthDateYear = date =>
  date instanceof Date
    ? toMonth(date) +
      " " +
      date.getUTCDate() +
      ", " +
      date.getUTCFullYear()
    : date;

/**
 * Format a date i.e. "Jan 14"
 * @param {Date} date Date to format
 * @returns {string} Formatted date string
 */
module.exports.shortMonthDate = date =>
  date instanceof Date
    ? toMonth(date).substring(0, 3) +
      " " +
      date.getUTCDate().toString().padStart(2, "0")
    : date;
