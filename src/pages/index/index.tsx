import {Image, Text, View} from "@tarojs/components";
import Taro, {useLoad} from '@tarojs/taro'
import user from "../../services/user";
import {AtAvatar, AtButton, AtDivider, AtGrid, AtIcon, AtMessage, AtNoticebar} from 'taro-ui'

import './index.scss'
import {useState} from "react";

import copperCoinIcon from "../../assets/images/copperCoin.png"
import silverCoinIcon from "../../assets/images/silverCoin.png"
import goldCoinIcon from "../../assets/images/goldCoin.png"
import mahjongIcon from "../../assets/images/mahjong.png"
import calendarIcon from "../../assets/images/calender.png"
import pointPointPointIcon from "../../assets/images/point.png"
import UserInfo = App.UserInfo;

const gridData = [
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

function Index() {
  const [ready, setReady] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfo>()

  // 加载获取用户信息，判断是否需要跳转登录页
  useLoad(() => {
    console.log("rain -------------------------rain -------------------------rain -------------------------rain -------------------------")
    user.getCurrentUser()
      .then(userInfo => {
        if (isUserInited(userInfo)) {
          setUserInfo(userInfo)
          setReady(true)
        } else {
          Taro.redirectTo({
            url: '../login/index'
          })
        }
      })
  })

  const isUserInited = (userInfo: UserInfo): boolean => {
    return userInfo != null
      && userInfo.nickname != null
      && userInfo.avatar != null
      && userInfo.nickname.length > 0
      && userInfo.avatar.length > 0
  }

  const handlUpdateButtonClick = () => {
    Taro.redirectTo({
      url: '../login/index?udpate=true'
    })
  }

  const handleGridClick = (item: object, index: number) => {
    console.log(`grid clicked, index: ${index}, item: ${item}`)
    switch (index) {
      case 0:
        // Taro.navigateTo({
        //   url: '../calendar/index'
        // })
        break;
      case 1:
        Taro.navigateTo({
          url: '../mahjong/index'
        })
        break;
    }
  }

  const testOnClick = () => {
    Taro.atMessage({
      'message': "Test成功",
      'type': 'success',
    })
  }

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

          <AtDivider className="divider" height={1}/>

          <View className='component'>
            <AtGrid data={gridData} mode={"rect"} hasBorder={false} columnNum={3} onClick={handleGridClick}/>

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
