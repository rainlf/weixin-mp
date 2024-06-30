import ApiResp = App.ApiResp;
import store from '../../store'
import weixinService from "../weixinService";

const server = 'http://127.0.0.1:8080'
// const server = 'https://mp.guanshantech.com'

interface Option {
  method: 'GET' | 'POST' | 'DELETE',
  url: string,
  data?: any | undefined,
}

// 封装GET
const sendGet = (api: string): Promise<any> => {
  const option: Option = {
    method: 'GET',
    url: server + api,
  }
  return request(option)
}

// 封装Post
const sendPost = (api: string, data: any): Promise<any> => {
  const option: Option = {
    method: 'POST',
    url: server + api,
    data,
  }
  return request(option)
}

// 封装Delete
const sendDelete = (api: string, data: any): Promise<any> => {
  const option: Option = {
    method: 'DELETE',
    url: server + api,
    data,
  }
  return request(option)
}

// 通信切面处理
const request = async (option: {}): Promise<any> => {
  // get toekn
  const token = store.getState().currentUser.token
  // put token in Authorization header
  const header: {} = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}` // 假设你使用Bearer token认证
  };

  // send and await request
  try {
    // console.log("Request >>", option)
    const response: any = await weixinService.wxRequest({...option, header})
    // console.log('Response <<', response)
    const apiResp: ApiResp<any> = response.data;
    if (!apiResp.success) {
      weixinService.wxShowToast(apiResp.errorMsg)
    }
    return apiResp.data
  } catch (error) {
    // console.error("Error <<", error)
    weixinService.wxShowToast('服务器正在迷路中，请稍后重试...')

  }
  return null
}

export default {
  sendGet,
  sendPost,
  sendDelete,
}
