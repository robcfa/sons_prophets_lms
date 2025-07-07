// Utility guards to replace raw Object.entries, .reduce, .length
export function safeEntries(obj) {
  return obj && typeof obj === 'object'
    ? Object.entries(obj)
    : [];
}

export function safeReduce(arr, fn, init) {
  return Array.isArray(arr)
    ? arr.reduce(fn, init)
    : init;
}

export function safeLength(arr) {
  return Array.isArray(arr)
    ? arr.length
    : 0;
}