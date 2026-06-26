import moment from 'moment'

/**
 * Format a date string using moment.js
 * @param {string|Date} date
 * @param {string} format
 * @returns {string}
 */
export const formatDate = (date, format = 'MMM D, YYYY') => {
  return moment(date).format(format)
}

/**
 * Format a date as relative time (e.g. "2 days ago")
 * @param {string|Date} date
 * @returns {string}
 */
export const fromNow = (date) => {
  return moment(date).fromNow()
}

/**
 * Truncate a string to a maximum length, appending ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export const truncate = (text, maxLength = 120) => {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '...'
}

/**
 * Convert a comma-separated string to an array of trimmed strings
 * @param {string} str
 * @returns {string[]}
 */
export const commaToArray = (str) => {
  if (!str) return []
  return str.split(',').map((s) => s.trim()).filter(Boolean)
}

/**
 * Convert an array to a comma-separated string
 * @param {string[]} arr
 * @returns {string}
 */
export const arrayToComma = (arr) => {
  if (!Array.isArray(arr)) return ''
  return arr.join(', ')
}

/**
 * Convert a newline-separated string to an array
 * @param {string} str
 * @returns {string[]}
 */
export const newlineToArray = (str) => {
  if (!str) return []
  return str.split('\n').map((s) => s.trim()).filter(Boolean)
}

/**
 * Convert an array to a newline-separated string
 * @param {string[]} arr
 * @returns {string}
 */
export const arrayToNewline = (arr) => {
  if (!Array.isArray(arr)) return ''
  return arr.join('\n')
}
