/** Get Month name or abbreviation from a date string
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
