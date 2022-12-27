/*

  Purpose: Create reactive and persistent local storage object

*/

import { useType } from './Type'
import { reactive, ref, watch } from 'vue'

function readFromLocalStorage (localStorageKey) {
  try {
    const localStorageValue = window.localStorage.getItem(localStorageKey)
    const localStorageJson = JSON.parse(localStorageValue)
    return localStorageJson
  } catch {
    return null
  }
}

function writeToLocalStorage (localStorageKey, value) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(value))
}

export function useLocalStorage (localStorageKey, defaults = undefined) {
  let value

  const localStorageValue = readFromLocalStorage(localStorageKey)

  if (useType(defaults) === 'object') {
    if (useType(localStorageValue) === 'object') {
      value = reactive({ ...defaults, ...localStorageValue })
    } else {
      value = reactive(defaults)
    }
  } else if (defaults !== undefined) {
    if (useType(defaults) === useType(localStorageValue)) {
      value = useType(localStorageValue) === 'array'
        ? reactive(localStorageValue)
        : ref(localStorageValue)
    } else {
      value = useType(defaults) === 'array' ? reactive(defaults) : ref(defaults)
    }
  } else {
    value = ref(localStorageValue)
  }

  watch(value, newValue => {
    writeToLocalStorage(localStorageKey, newValue)
  })

  return value
}
