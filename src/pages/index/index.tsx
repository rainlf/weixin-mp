import {useState} from 'react'
import {Button, Image, Input, ScrollView, Text, View} from '@tarojs/components'
import {AtButton} from 'taro-ui'

import './index.scss'

const defaultAvatar = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

function Index() {
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar)
  const [nickname, setNickname] = useState('')

  const handleChooseAvatar = (e: any) => {
    const tempFilePath = e.detail.avatarUrl // 注意这里可能需要调整以匹配实际返回的数据结构
    if (tempFilePath) {
      setAvatarUrl(tempFilePath)
    }
  }

  const handleLogin = () => {
    console.log('rain, login')

  }

  return (
    <>
      <ScrollView scrollY className="scrollarea">
        <View className='container'>
          <View className="userinfo">
            <Button className="avatarWrapper" open-type="chooseAvatar" onChooseAvatar={handleChooseAvatar}>
              <Image className="avatar" src={avatarUrl}></Image>
            </Button>
            <View className="nicknameWrapper">
              <Text className="nicknameLabel">昵称</Text>
              <Input className="nicknameInput" type="nickname" placeholder="请输入昵称" value={nickname} />
            </View>
          </View>
          <View className="login">
            <AtButton type='secondary' onClick={handleLogin}>登录</AtButton>
          </View>
        </View>
      </ScrollView>
    </>

  )

}

export default Index
