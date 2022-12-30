export function useHelloWorld () {

  function greet({ name = 'User' }) {
    console.log(`Hello ${name}`)    
  }

  return {
    greet
  }

}
