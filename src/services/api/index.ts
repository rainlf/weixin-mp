const server: string = 'http://127.0.0.1:8080'
// const server: string = 'https://mp.guanshantech.com'

const wx_get = (api: string): Promise<any> => {
  const token = wx.getStorageSync('token') || '';
  const header: any = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}` // 假设你使用Bearer token认证
  };

  return new Promise((resolve, reject) => {
    wx.request({
      method: 'GET',
      header,
      url: server + api,
      success: (res: any) => {
        resolve(res.data)
      },
      fail: (err: any) => {
        reject(err)
      },
    })
  })
}

const wx_post = (api: string, data: any): Promise<any> => {
  const token = wx.getStorageSync('token') || '';
  const header: any = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}` // 假设你使用Bearer token认证
  };

  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      header,
      url: server + api,
      data,
      success: (res: any) => {
        resolve(res.data)
      },
      fail: (err: any) => {
        reject(err)
      },
    })
  })
}

export default {
  wx_get,
  wx_post,
}
