import {Image, Text, View} from "@tarojs/components";
import Taro, {useLoad} from '@tarojs/taro'
import {getCurrentUser} from "../../services/user";
import {AtAvatar, AtButton, AtDivider, AtGrid, AtIcon, AtMessage, AtNoticebar} from 'taro-ui'

import './index.scss'
import {useState} from "react";

import copperCoinIcon from "../../assets/images/copper-coin.png"
import silverCoinIcon from "../../assets/images/silver-coin.png"
import goldCoinIcon from "../../assets/images/gold-coin.png"
import mahjongIcon from "../../assets/images/mj.png"
import calendarIcon from "../../assets/images/日历.png"
import pointPointPointIcon from "../../assets/images/点点点.png"
import UserInfo = App.UserInfo;

function Index() {
  const [ready, setReady] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo>()

  // 加载获取用户信息，判断是否需要跳转登录页
  useLoad(() => {
    getCurrentUser()
      .then(userInfo => {
        if (isUserInited(userInfo)) {
          console.log('user is inited, show current page')
          setUserInfo(userInfo)
          setReady(true)
        } else {
          console.log('user is not inited, jump to login page')
          Taro.navigateTo({
            url: '../login/index'
          })
        }
      })
  })

  const isUserInited = (userInfo: UserInfo): boolean => {
    return userInfo.nickname.length > 0 && userInfo.avatar.length > 0
  }

  const handlUpdateButtonClick = () => {
    Taro.redirectTo({
      url: '../login/index?udpate=true'
    })
  }

  const testOnClick = (e: any) => {
    console.log('rain', e)
    Taro.atMessage({
      'message': '消息通知',
      'type': 'success',
    })
  }

  const testData = [
    {
      image: calendarIcon,
      value: '活动日历'
    },
    {
      image: mahjongIcon,
      value: '健身麻将'
    },
    {
      image: pointPointPointIcon,
      value: '敬请期待'
    },
  ]

  return (
    <>
      {
        ready &&
        <View className='container'>
          <AtMessage/>
          <AtNoticebar single marquee speed={50}>这是 NoticeBar 通告栏</AtNoticebar>

          <View className='userInfo'>

            <View className='avatarWrapper'>
              <AtAvatar size="large" image={userInfo?.avatar}></AtAvatar>
            </View>

            <View className='detailWrapper'>
              <view className='nickname'>
                <Text>{userInfo?.nickname}</Text>
              </view>
              <view className='asset'>
                <Image className="coin" src={copperCoinIcon}></Image>
                <View className="coinNumber">
                  <text>{userInfo?.copperCoin}</text>
                </View>
                <Image className="coin" src={silverCoinIcon}></Image>
                <Text className="coinNumber">{userInfo?.silverCoin}</Text>
                <Image className="coin" src={goldCoinIcon}></Image>
                <Text className="coinNumber">{userInfo?.goldCoin}</Text>
              </view>
            </View>

            <view className="updateButtonWrapper" onClick={handlUpdateButtonClick}>
              <AtIcon value='chevron-right' size='10' color="gray"></AtIcon>
            </view>
          </View>

          <AtDivider height={1}/>

          <View className='component'>
            <AtGrid data={testData} mode={"rect"} hasBorder={false} columnNum={1}/>

            <AtButton type="primary" onClick={testOnClick}>
              Test
            </AtButton>

          </View>
        </View>
      }
    </>
  )
}

export default Index
