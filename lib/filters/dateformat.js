import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

/**
 * Format date with string format
 * @param {Date} date Date to format
 * @param {String} format Format string
 * @returns Formatted date string
 */
export default (date, format = "MM/DD/YYYY") => {
    return dayjs(date).utc().format(format);
}
