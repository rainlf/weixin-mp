import ApiResp = App.ApiResp;
import envConfig from "../../env.config"
import weixinService from "../weixinService";

const server = envConfig.server

interface Option {
  method: 'GET' | 'POST',
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

// 通信切面处理
const request = async (option: {}): Promise<ApiResp<any>> => {
  // get toekn
  const token = "xxx"
  // put token in Authorization header
  const header: {} = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${token}` // 假设你使用Bearer token认证
  };

  // send and await request
  console.log("Request >>", option)
  const response: any = await weixinService.wxRequest({...option, header})
  console.log('Response <<', response)

  const apiResp: ApiResp<any> = response.data;
  if (apiResp.success) {
    weixinService.wxShowToast(apiResp.errorMsg)
  }
  return apiResp.data
}

export default {
  sendGet,
  sendPost,
}
