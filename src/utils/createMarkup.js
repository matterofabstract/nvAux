/**
 * Return a payload for React's dangerouslySetInnerHTML
 *
 * you have to type out dangerouslySetInnerHTML and pass an object with a
 * __html key, to remind yourself that it’s dangerous.
 *
 * See: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 *
 */
export const createMarkup = (stringWithHtmlMarkup) => ({
  __html: stringWithHtmlMarkup
});
