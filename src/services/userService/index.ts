import api from '../api'
import store from "../../store";
import {setUser, setUserList} from "../../store/currentUserSlice";
import UserInfo = App.UserInfo;

const getCurrentUser = async () => {
  const userInfo: UserInfo = await api.sendGet(`/api/user/current`)
  store.dispatch(setUser(userInfo))
  return userInfo
}

const getUserList = async () => {
  const userList: UserInfo[] = await api.sendGet(`/api/user/list`)
  store.dispatch(setUserList(userList))
  return userList
}

const updateCurrentUser = (nickname: string, avatar: string): Promise<UserInfo> => {
  return api.sendPost(`/api/user/current?nickname=${nickname}&avatar=${avatar}`, null)
}

export default {
  getUserList,
  getCurrentUser,
  updateCurrentUser,
}
