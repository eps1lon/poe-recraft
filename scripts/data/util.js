module.exports = { nullToUndefined };

/**
 *
 * @param {T | null | undefined} value
 * @returns {T | undefined}
 */
function nullToUndefined(value) {
  return value == null ? undefined : value;
}
