import api from '../api'

export const login = (): void => {
  api.login().then(() => console.log("app login success"))
}

