import {useState} from 'react'
import {Button, Image, Input, Text, View} from '@tarojs/components'

import "taro-ui/dist/style/components/button.scss" // 按需引入
import './index.scss'

function Index() {
  const [avatarUrl, setAvatarUrl] = useState('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')

  const handleChooseAvatar = async (e: any) => {
    console.log('rain', e)
    const tempFilePath = e.detail.avatarUrl // 注意这里可能需要调整以匹配实际返回的数据结构
    console.log('rain2', tempFilePath)
    if (tempFilePath) {
      setAvatarUrl(tempFilePath)
    }
  }

  const handleChooseNickname = async (e: any) => {
    console.log('rain', e)
    const tempFilePath = e.detail.avatarUrl // 注意这里可能需要调整以匹配实际返回的数据结构
    console.log('rain2', tempFilePath)
    if (tempFilePath) {
      setAvatarUrl(tempFilePath)
    }
  }

  return (
    <View className='container'>
      <View className="userinfo">
        <Button className="avatarWrapper" open-type="chooseAvatar" onChooseAvatar={handleChooseAvatar}>
          <Image className="avatar" src={avatarUrl}></Image>
        </Button>
        <View className="nicknameWrapper">
          <Text className="nicknameLabel">昵称</Text>
          <Input className="nicknameInput" type="nickname" placeholder="请输入昵称" onBlur={handleChooseNickname}/>
        </View>
      </View>

    </View>
  )

}

export default Index
