import {Component, PropsWithChildren} from 'react'
import './app.scss'
import {login} from "./services/auth";

class App extends Component<PropsWithChildren> {

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  onLaunch() {
    // 登录
    wx.login({
      success: (res: any) => {
        console.log('login code', res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        login(res.code)
          .then((token: any) => {
            console.log('login token', token)
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
