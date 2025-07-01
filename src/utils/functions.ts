/**
 *
 * @param {string} txt - the input txt to be sliced
 * @param {number} [maxLength = 50] - the maximum length before truncation
 * @returns
 */
export function txtSlicer(txt: string, maxLength: number = 50) {
  if (txt.length >= maxLength) return `${txt.slice(0, maxLength)}...`;
  return txt;
}
