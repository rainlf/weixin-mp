interface EnvConfig {
  server: string
}

let envConfig: EnvConfig
if (process.env.NODE_ENV === 'development') {
  envConfig = {
    server: 'http://127.0.0.1:8080'
  }
} else {
  envConfig= {
    server: 'https://mp.guanshantech.com'
  }
}

export default envConfig
