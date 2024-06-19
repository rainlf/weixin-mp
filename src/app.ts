import {Component, PropsWithChildren} from 'react'
import './app.scss'

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import {login} from "./services/auth"

class App extends Component<PropsWithChildren> {

  onLaunch() {
    // 登录
    console.info("hello world")
    login()
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}

export default App
