import { useType } from './Type'
import { reactive, ref, watch } from 'vue'

const { getType } = useType()

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
  if (value === undefined || value === null) {
    window.localStorage.removeItem(localStorageKey)
  } else {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value))
  }
}

export function useLocalStorage (options) {
  options = options || {}
  const { localStorageKey, defaultValue = null } = options

  let state

  const localStorageValue = readFromLocalStorage(localStorageKey)

  if (getType({ value: defaultValue }) === 'object') {
    if (getType({ value: localStorageValue }) === 'object') {
      state = reactive({ ...defaultValue, ...localStorageValue })
    } else {
      state = reactive({ ...defaultValue })
    }
  } else if (getType({ value: defaultValue }) === 'array') {
    state = getType({ value: localStorageValue }) === 'array'
      ? reactive([...localStorageValue])
      : reactive([...defaultValue])
  } else {
    state = getType({ value: defaultValue }) === getType({ value: localStorageValue })
      ? ref(localStorageValue)
      : ref(defaultValue)
  }

  function reset () {
    if (getType({ value: defaultValue }) === 'object') {
      Object.keys(state.value).forEach(key => {
        state[key] = defaultValue[key]
      })
    } else if (getType({ value: defaultValue }) === 'array') {
      state.splice(0, state.length, ...defaultValue)
    } else {
      state.value = defaultValue
    }
  }

  watch(state, newValue => {
    writeToLocalStorage(localStorageKey, newValue)
  })

  return {
    state,
    reset
  }
}
