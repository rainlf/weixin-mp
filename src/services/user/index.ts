import api from '../api'
import UserInfo = App.UserInfo;

export const getCurrentUser = (): Promise<UserInfo> => {
  // return new Promise((resolve) => {
  //   resolve({
  //     id : 1,
  //     // nickname : "",
  //     // avatar : "",
  //     nickname : "rain",
  //     avatar : "http://tmp/3DTDMpVO4sgK9d2210401c27d73bda1ee3012e213384.jpeg",
  //     copperCoin : 999,
  //     silverCoin : 888,
  //     goldCoin : 777
  //   })
  // })
  return api.wx_get(`/api/user/current`)
}

export const getAllUser = (): Promise<UserInfo[]> => {
  return api.wx_get(`/api/user/all`)
}

export const updateCurrentUser = (nickname: string, avatar: string): Promise<UserInfo> => {
  return api.wx_post(`/api/user/current?nickname=${nickname}&avatar=${avatar}`, null)
}
