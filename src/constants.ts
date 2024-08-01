const isTestEnv = process.env.NODE_ENV === 'test'
export const LICHESS_API_URL = `https://lichess.${
  isTestEnv ? 'dev' : 'org'
}`
