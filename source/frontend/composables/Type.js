export function useType () {

  function getType(options) {
    let value
    try {
      value = options.value !== undefined ? options.value : undefined
    } catch {
      value = undefined
    }
    if (value === undefined) return 'undefined'
    else if (value === null) return 'null'
    else if (Array.isArray(value)) return 'array'
    else if (value instanceof Error) return 'error'
    else if (value instanceof URL) return 'url'
    else if (typeof value === 'object') return 'object'
    else if (typeof value === 'string') return 'string'
    else if (typeof value === 'number') return 'number'
    else if (typeof value === 'boolean') return 'boolean'
    else return 'unknown'
  }

  return {
    getType
  }

}
