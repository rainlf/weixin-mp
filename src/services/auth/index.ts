import api from "../api";
import weixin from "../weixin";

const wxLogin = (): Promise<string> => {
  return weixin.wxLogin()
}

const appLogin = (code: string): Promise<string> => {
  return api.sendPost(`/api/auth/login?code=${code}`, null)
}

export default {
  wxLogin,
  appLogin,
}
