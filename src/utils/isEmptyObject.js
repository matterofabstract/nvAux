// export const isEmptyObject = (/** @type {{ constructor?: any; }} */ obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export const isEmptyObject = (obj) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
