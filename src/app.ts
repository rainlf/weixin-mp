import {Component, PropsWithChildren} from 'react'
import './app.scss'

import 'taro-ui/dist/style/index.scss'
import {login, wx_login} from "./services/auth"; // 全局引入一次即可

class App extends Component<PropsWithChildren> {

  componentDidMount() {
    // 登录
    (async () => {
      console.info("hello world");
      const code: string = await wx_login()
      console.log("wx login code: ", code)
      const token: string = await login(code)
      wx.setStorageSync('token', token)
      console.log("app login token: ", token)
      console.info("hello world end");
    })();
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
