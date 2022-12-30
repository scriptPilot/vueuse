const dev = {
  googleClientId: 'devClientId',
  googleClientSecret: 'devSecret'
}

const prod = {
  googleClientId: 'prodClientId',
  googleClientSecret: 'prodSecret'
}

export default import.meta.env.DEV ? dev : prod
