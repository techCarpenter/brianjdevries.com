const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);

/**
 * Format date with string format
 * @param {Date} date Date to format
 * @param {String} format Format string
 * @returns Formatted date string
 */
module.exports = (date, format = "MM/DD/YYYY") => {
  return dayjs(date).utc().format(format);
}
