/** Return true is the date string supplied is today or in the future.
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
export const isTodayOrFuture = (jsDateString) => {
  // Reset hours as we want to include the entire day.
  // Get UNIX timestamp format by multiply by 1000. Working in milliseconds, not seconds.
  const today = new Date().setHours(0, 0, 0, 0) * 1000;
  const jsDateObj = new Date(Date.parse(jsDateString)).setHours(0, 0, 0, 0) * 1000;
  if (jsDateObj >= today) {
    return true;
  } else {
    return false;
  }
};
