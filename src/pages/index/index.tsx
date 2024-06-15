import {Button, Image, Input, Text, View} from "@tarojs/components";
import Taro, {useLoad} from '@tarojs/taro'
import {getCurrentUser} from "../../services/user";
import UserInfo = App.UserInfo;
import {AtButton} from "taro-ui";

import './index.scss'

function Index2() {
  useLoad(() => {
    getCurrentUser()
      .then(resp => {
        wx.setStorageSync('user', resp)
        if (isUserInited(resp)) {
          console.log('user is inited, show current page')
        } else {
          console.log('user is not inited, jump to login page')
          Taro.redirectTo({
            url: '../login/index'
          })
        }
      })
  })

  const isUserInited = (userInfo: UserInfo): boolean => {
    return userInfo.nickname.length > 0 && userInfo.avatar.length > 0
  }

  return (
    <>
      <View className='container'>
        <Text>asdfasdfasdf</Text>
      </View>
    </>
  )
}

export default Index2
