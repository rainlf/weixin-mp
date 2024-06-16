import {useState} from 'react'
import {Button, Image, Input, Text, View} from '@tarojs/components'
import {AtAvatar, AtButton} from 'taro-ui'
import Taro, {useLoad} from '@tarojs/taro'

import './index.scss'
import {updateCurrentUser} from "../../services/user";
import UserInfo = App.UserInfo;

const defaultAvatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

function Index() {
  const [update, setUpdate] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)
  const [nickname, setNickname] = useState('')

  useLoad((options) => {
    if (options.udpate) {
      setUpdate(options.udpate)
    }

    const userInfo: UserInfo = wx.getStorageSync('user')
    if (userInfo?.nickname) {
      setNickname(userInfo?.nickname)
    }
    if (userInfo?.avatar) {
      setAvatarUrl(userInfo?.avatar)
    }
  })

  const handleChooseAvatar = (e: any) => {
    const avatarUrl = e.detail.avatarUrl // 注意这里可能需要调整以匹配实际返回的数据结构
    if (avatarUrl) {
      setAvatarUrl(avatarUrl)
    }
  }

  const handleChooseNickname = (e: any) => {
    const nickname = e.detail.value // 注意这里可能需要调整以匹配实际返回的数据结构
    if (nickname) {
      setNickname(nickname)
    }
  }


  const handleLogin = () => {
    console.log(avatarUrl)
    if (avatarUrl == defaultAvatar || avatarUrl == '') {
      Taro.showToast({
        title: '请点击头像',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (nickname == '') {
      Taro.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    updateCurrentUser(nickname, avatarUrl)
      .then((resp) => {
        wx.setStorageSync('user', resp)
        Taro.navigateTo({
          url: '../index/index',
          success: () => {
            Taro.atMessage({
              'message': '更新成功',
              'type': 'success',
            })
          }
        })
      })
  }

  return (
    <>
      <View className='loginContainer'>
        <View className="userinfo">
          <Button className="avatarWrapper" open-type="chooseAvatar" onChooseAvatar={handleChooseAvatar}>
            <AtAvatar className="avatar" image={avatarUrl}></AtAvatar>
          </Button>
          <View className="nicknameWrapper">
            <Text className="nicknameLabel">昵称</Text>
            <Input className="nicknameInput" type="nickname" placeholder="请输入昵称" value={nickname}
                   onInput={handleChooseNickname}/>
          </View>
        </View>
        <View className="login">
          <AtButton type='secondary' onClick={handleLogin}>{update ? "更新" : "登录"}</AtButton>
        </View>
      </View>
    </>
  )
}

export default Index
