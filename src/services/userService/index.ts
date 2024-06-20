import api from '../api'
import UserInfo = App.UserInfo;

const getCurrentUser = (): Promise<UserInfo> => {
  return api.sendGet(`/api/user/current`)
}

const getAllUser = (): Promise<UserInfo[]> => {
  return api.sendGet(`/api/user/all`)
}

const updateCurrentUser = (nickname: string, avatar: string): Promise<UserInfo> => {
  return api.sendPost(`/api/user/current?nickname=${nickname}&avatar=${avatar}`, null)
}

export default {
  getAllUser,
  getCurrentUser,
  updateCurrentUser,
}
