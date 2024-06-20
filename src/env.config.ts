let config = {}
if (process.env.NODE_ENV === 'development') {
  config = {
    serverUrl: 'http://127.0.0.1:8080'
  }
} else {
  config = {
    serverUrl: 'https://mp.guanshantech.com'
  }
}

export const envConfig = config
