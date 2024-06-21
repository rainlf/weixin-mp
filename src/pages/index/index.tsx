import {Image, Text, View} from "@tarojs/components";
import Taro, {useLoad} from '@tarojs/taro'
import userService from "../../services/userService";
import {AtAvatar, AtButton, AtDivider, AtGrid, AtIcon, AtMessage, AtNoticebar} from 'taro-ui'

import './index.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import copperCoinIcon from "../../assets/images/copperCoin.png"
import silverCoinIcon from "../../assets/images/silverCoin.png"
import goldCoinIcon from "../../assets/images/goldCoin.png"
import mahjongIcon from "../../assets/images/mahjong.png"
import calendarIcon from "../../assets/images/calender.png"
import pointPointPointIcon from "../../assets/images/point.png"
import {setCurrentUser} from "../../store/currentUserSlice";
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

const Index = () => {
  const token: string = useSelector((state: any) => state.token.value)
  const currentUser: UserInfo = useSelector((state: any) => state.currentUser.value)
  const dispatch = useDispatch()

  const [ready, setReady] = useState(false)

  useEffect(() => {
    (async () => {
      if (token && token.length > 0) {
        const user: UserInfo = await userService.getCurrentUser()
        dispatch(setCurrentUser(user))
        if (isUserInited(user)) {
          setReady(true)
        } else {
          Taro.redirectTo({
            url: '../login/index',
            success: () => {
              Taro.atMessage({
                  'message': "请填写基础信息登录",
                  'type': 'success',
                }
              )
            }
          })
        }
      }
    })();
  }, [token])

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
              <AtAvatar size="large" image={currentUser.avatar}></AtAvatar>
            </View>

            <View className='detailWrapper'>
              <view className='nickname'>
                <Text>{currentUser.nickname}</Text>
              </view>
              <view className='asset'>
                <Image className="coin" src={copperCoinIcon}></Image>
                <View className="coinNumber">
                  <text>{currentUser.copperCoin}</text>
                </View>
                <Image className="coin" src={silverCoinIcon}></Image>
                <Text className="coinNumber">{currentUser.silverCoin}</Text>
                <Image className="coin" src={goldCoinIcon}></Image>
                <Text className="coinNumber">{currentUser.goldCoin}</Text>
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
