import api from '../api'
import UserInfo = App.UserInfo;

export const getCurrentUser = (): Promise<UserInfo> => {
  return api.wx_get(`/api/user/current`)
}

export const getAllUser = (): Promise<UserInfo[]> => {
  return api.wx_get(`/api/user/all`)
}

export const updateCurrentUser = (nickname: string, avatar: string): Promise<UserInfo> => {
  return api.wx_post(`/api/user/current?nickname=${nickname}&avatar=${avatar}`, null)
}
