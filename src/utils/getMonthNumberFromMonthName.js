/** Convert a lowercase month abbrevation to month number.
 *
 * Usage:
 *   getMonthNumberFromMonthName('Mar')
 *
 * Returns:
 *   3
 *
 */
export const getMonthNumberFromMonthName = (mon) => {
  var d = Date.parse(mon + '1, 2020');
  if (!isNaN(d)) {
    return new Date(d).getMonth() + 1;
  }
  return -1;
};
