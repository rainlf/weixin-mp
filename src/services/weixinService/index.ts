// 统一管理 wx 接口，Thanks for support of kunkun
import ApiResp = App.ApiResp;

const wxRequest = (option: {}): Promise<ApiResp<any>> => {
  return wx.request({...option})
}

const wxLogin = async (): Promise<string> => {
  const res = await wx.login()
  return res.code
}

const wxShowToast = (message: string): void => {
  wx.showToast({
    icon: 'none',
    title: message,
    duration: 2000,
  });
}

export default {
  wxRequest,
  wxLogin,
  wxShowToast,
}
