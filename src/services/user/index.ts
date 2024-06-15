import api from '../api'
import ApiResp = App.ApiResp;
import UserInfo = App.UserInfo;

export const getCurrentUser = (): Promise<ApiResp<UserInfo>> => {
  return api.wx_get(`/api/user/current`)
}

export const getAllUser = (): Promise<ApiResp<UserInfo>[]> => {
  return api.wx_get(`/api/user/all`)
}

export const updateCurrentUser = (nickname: string, avatar: string): Promise<ApiResp<UserInfo>> => {
  return api.wx_post(`/api/user/all?nickname=${nickname}&avatar=${avatar}`, null)
}
