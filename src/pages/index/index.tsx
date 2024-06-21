import {Image, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import userService from "../../services/userService";
import {AtAvatar, AtDivider, AtGrid, AtIcon, AtMessage, AtNoticebar} from 'taro-ui'

import './index.scss'
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import copperCoinIcon from "../../assets/images/copperCoin.png"
import silverCoinIcon from "../../assets/images/silverCoin.png"
import goldCoinIcon from "../../assets/images/goldCoin.png"
import mahjongIcon from "../../assets/images/mahjong.png"
import calendarIcon from "../../assets/images/calender.png"
import mangoIcon from "../../assets/images/mango.png"
import eggIcon from "../../assets/images/egg.png"
import sportIcon from "../../assets/images/sport.png"
import pointPointPointIcon from "../../assets/images/point.png"
import {setCurrentUser} from "../../store/currentUserSlice";
import UserInfo = App.UserInfo;

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
      url: '../login/index?udpate=true',
      success: () => {
        Taro.atMessage({
            'message': "点击更新更新用户信息",
            'type': 'success',
          }
        )
      }
    })
  }


  const gridData = [
    {
      image: calendarIcon,
      value: '芒芒日历'
    },
    {
      image: mahjongIcon,
      value: '敲敲敲麻'
    },
    {
      image: eggIcon,
      value: '掼蛋掼蛋'
    },
    {
      image: mangoIcon,
      value: '果果清单'
    },
    {
      image: sportIcon,
      value: '运动还债'
    },
    {
      image: pointPointPointIcon,
      value: '敬请期待'
    },
  ]

  const handleGridClick = (item: object, index: number) => {
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: '../mahjong/index'
        })
        break;
      default:
        Taro.atMessage({
            'message': "程序员正在该来的路上...",
            'type': 'success',
          }
        )
    }
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
            <AtGrid data={gridData} hasBorder={false} columnNum={3} onClick={handleGridClick}/>
          </View>
        </View>
      }
    </>
  )
}

export default Index
