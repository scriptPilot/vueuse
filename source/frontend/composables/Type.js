/*

  Purpose: Return type of the value

*/

export function useType (value) {
  if (value === null) return 'null'
  else if (Array.isArray(value)) return 'array'
  else if (typeof value === 'object') return 'object'
  else if (typeof value === 'string') return 'string'
  else if (typeof value === 'number') return 'number'
}
