// 统一管理 wx 接口，Thanks for support of kunkun
// wx.reqeust 不支持以 Promise 风格 调用
const wxRequest = (option: {}): Promise<any> => {
  return new Promise((resolve, reject) => {
    wx.request(
      {
        ...option,
        success: ((resp: any) => resolve(resp)),
        fail: ((err: any) => reject(err)),
      }
    )
  })
}

// wx.login 不支持以 Promise 风格 调用
const wxLogin = (): Promise<any> => {
  return wx.login()
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
