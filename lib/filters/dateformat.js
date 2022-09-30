const dayjs = require("dayjs");

/**
 * Format date with string format
 * @param {Date} date Date to format
 * @param {String} format Format string
 * @returns Formatted date string
 */
module.exports = (date, format = "MM/DD/YYYY") => {
	return dayjs(date).format(format);
}
