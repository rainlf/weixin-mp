import api from '../api'

export const getCurrentUser = (): any => {
  return api.wx_get(`/api/user/current`)
}

// export const getAllUser = ():
