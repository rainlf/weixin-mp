import api from '../api'

export const login = (code: string): any => {
  return api.wx_post(`/api/auth/login?code=${code}`, null)
}

