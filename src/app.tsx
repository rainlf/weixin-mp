import {Component, PropsWithChildren} from 'react'
import {Provider} from 'react-redux';
import {setToken} from './store/currentUserSlice'
import store from './store'
import './app.scss'

import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import authService from './services/authService'


class App extends Component<PropsWithChildren> {
  onLaunch() {
    // 登录，应用上下文，与页面加载（页面上下文）为异步关联
    console.info("hello world")
    authService.wxLogin()
      .then((resp: any) => authService.appLogin(resp.code))
      .then((token: string) => store.dispatch(setToken(token)))
  }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
