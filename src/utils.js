/* Return true is the date string supplied is today or in the future.
 *
 * The argument must be a string representing a simplification of the ISO 8601
 * calendar date extended format (other formats may be used, but results are
 * implementation-dependent)
 *
 * Usage:
 *   isTodayOrFuture('Tue Mar 24 2015 19:00:00 GMT-0500')
 *
 * Returns:
 *   false
 *
 */
export const isTodayOrFuture = jsDateString => {
  // Reset hours as we want to include the entire day.
  // Get UNIX timestamp format by multiply by 1000. Working in milliseconds, not seconds.
  const today = new Date().setHours(0, 0, 0, 0) * 1000;
  const jsDateObj =
    new Date(Date.parse(jsDateString)).setHours(0, 0, 0, 0) * 1000;
  if (jsDateObj >= today) {
    return true;
  } else {
    return false;
  }
};

/* Get Month name or abbreviation from a date string
 *
 * Usage:
 *   getMonthName('Tue Mar 24 2015 19:00:00 GMT-0500', true)
 *
 * Returns:
 *   Mar
 *
 */
export const getMonthNameFromDateString = (dateStr, abbreviated = false) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  const jsDateObj = new Date(Date.parse(dateStr));
  if (abbreviated) {
    return monthNames[jsDateObj.getMonth()].substring(0, 3);
  } else {
    return monthNames[jsDateObj.getMonth()];
  }
};

/* Convert a lowercase month abbrevation to month number.
 *
 * Usage:
 *   getMonthNumberFromMonthName('Mar')
 *
 * Returns:
 *   3
 *
 */
export const getMonthNumberFromMonthName = mon => {
  var d = Date.parse(mon + '1, 2020');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
};

/* Return a payload for React's dangerouslySetInnerHTML
 *
 * you have to type out dangerouslySetInnerHTML and pass an object with a
 * __html key, to remind yourself that it’s dangerous.
 *
 * See: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 *
 */
export const createMarkup = stringWithHtmlMarkup => ({
  __html: stringWithHtmlMarkup
});
