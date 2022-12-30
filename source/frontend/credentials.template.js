const dev = {
  googleClientId: 'devClientId',
  googleSecret: 'devSecret'
}

const prod = {
  googleClientId: 'prodClientId',
  googleSecret: 'prodSecret'
}

export default import.meta.env.DEV ? dev : prod