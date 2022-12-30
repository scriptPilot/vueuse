export function useHelloWorld () {

  function greet({ name = 'User' }) {
    name = name || 'User'
    console.log(`Hello ${name}`)    
  }

  return {
    greet
  }

}
