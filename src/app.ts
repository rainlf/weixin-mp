import {Component, PropsWithChildren} from 'react'
import './app.scss'
import {login} from "./services/auth";

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可

class App extends Component<PropsWithChildren> {

  onLaunch() {
    // 登录
    wx.login({
      success: (res: any) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        login(res.code)
          .then((token: any) => {
            // token 埋入本地存储
            wx.setStorageSync('token', token)
          })
      },
    })
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
