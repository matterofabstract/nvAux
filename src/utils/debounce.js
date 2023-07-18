export const debounce = (callback, wait) => {
  let timeoutId = null;
  return (/** @type {any} */ ...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
};
