import api from '../api'


export const wx_login = (): Promise<string> => {
  return api.wx_login()
}

export const login = (code: string): Promise<string> => {
  return api.wx_post(`/api/auth/login?code=${code}`, null)
}

