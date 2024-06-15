import api from '../api'

export const login = (code: string): Promise<string> => {
  return api.wx_post(`/api/auth/login?code=${code}`, null)
}

