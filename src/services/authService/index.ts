import api from "../api";
import weixinService from "../weixinService";

const wxLogin = (): Promise<any> => {
  return weixinService.wxLogin()
}

const appLogin = (code: string): Promise<string> => {
  return api.sendPost(`/api/auth/login?code=${code}`, null)
}

export default {
  wxLogin,
  appLogin,
}
