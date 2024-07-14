import {useEffect, useState} from 'react'
import {Button, Input, Text, View} from '@tarojs/components'
import {AtAvatar, AtButton, AtMessage} from 'taro-ui'
import Taro, {useLoad} from '@tarojs/taro'

import './index.scss'
import userService from "../../services/userService";
import {useSelector} from "react-redux";
import UserInfo = App.UserInfo;

const defaultAvatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

function LoginPage() {
  const currentUser: UserInfo = useSelector((state: any) => state.currentUser.user)

  const [update, setUpdate] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)
  const [nickname, setNickname] = useState('')


  // 解析路径参数
  useLoad((options) => {
    if (options.udpate) {
      setUpdate(options.udpate)
    }

    userService.getCurrentUser()
  })


  useEffect(() => {
    setNickname(currentUser.nickname)
    setAvatarUrl(currentUser.avatar)
  }, [currentUser]);

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


  const handleLogin = async () => {
    console.log(avatarUrl)
    if (avatarUrl == null || avatarUrl == defaultAvatar || avatarUrl == '') {
      Taro.showToast({
        title: '请点击头像',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (nickname == null || nickname == '') {
      Taro.showToast({
        title: '请输入昵称',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (nickname.length > 6) {
      Taro.showToast({
        title: '昵称太长了捏🤏',
        icon: 'none',
        duration: 2000
      })
      return
    }
    const userInfo:UserInfo = await userService.updateCurrentUser(nickname, avatarUrl);
    await userService.uploadUserAvatar(userInfo.id, avatarUrl);
    setAvatarUrl(userService.getUserAvatar(currentUser.id))

    Taro.redirectTo({
      url: '../index/index',
      success: () => {
        Taro.atMessage({
          'message': update ? "更新成功" : "登录成功",
          'type': 'success',
        })
      }
    })
  }

  return (
    <>
      <AtMessage/>
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

export default LoginPage
