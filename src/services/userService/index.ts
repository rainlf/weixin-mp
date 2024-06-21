import api from '../api'
import UserInfo = App.UserInfo;

const getCurrentUser = (): Promise<UserInfo> => {
  return api.sendGet(`/api/user/current`)
}

const getUserList = (): Promise<UserInfo[]> => {
  return api.sendGet(`/api/user/list`)
}

const updateCurrentUser = (nickname: string, avatar: string): Promise<UserInfo> => {
  return api.sendPost(`/api/user/current?nickname=${nickname}&avatar=${avatar}`, null)
}

export default {
  getUserList,
  getCurrentUser,
  updateCurrentUser,
}
