import {Image, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import userService from "../../services/userService";
import {AtAvatar, AtDivider, AtGrid, AtIcon, AtMessage, AtNoticebar} from 'taro-ui'

import './index.scss'
import {useEffect, useState} from "react";
import {useSelector} from 'react-redux'

import copperCoinIcon from "../../assets/images/铜币.png"
import silverCoinIcon from "../../assets/images/银币.png"
import goldCoinIcon from "../../assets/images/金币.png"

import calendarIcon from "../../assets/images/插画日历.png"
import mahjongIcon from "../../assets/images/麻将.png"
import eggIcon from "../../assets/images/蛋.png"
import mangoIcon from "../../assets/images/芒果.png"
import sportIcon from "../../assets/images/运动.png"
import pointPointPointIcon from "../../assets/images/点点点.png"

import UserInfo = App.UserInfo;

const MainPage = () => {
  const token: string = useSelector((state: any) => state.currentUser.token)
  const currentUser: UserInfo = useSelector((state: any) => state.currentUser.user)

  const [ready, setReady] = useState(false)
  const [notifyMessage, setNotifyMessage] = useState('芒果🥭 橘子🍊 山药🍒 土豆🥔 芋泥🍑 胡萝卜🥕 大米饭 🍚')

  useEffect(() => {
    (async () => {
      if (token && token.length > 0) {
        const user = await userService.getCurrentUser()
        if (isUserInited(user)) {
          // 渲染首页
          setReady(true)
        } else {
          // 跳转登录
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

        // 获取全部用户
        await userService.getUserList()
      }
    })();
  }, [token])

  useEffect(() => {
    if (currentUser?.copperCoin < 0) {
      setNotifyMessage("😡资产负数了，该还债啦，快去运动啊啊啊😡 😡资产负数了，该还债啦，快去运动啊啊啊😡 😡资产负数了，该还债啦，快去运动啊啊啊😡")
    }
  }, [currentUser]);

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
      value: '芒芒日历🏗️'
    },
    {
      image: mahjongIcon,
      value: '敲麻'
    },
    {
      image: eggIcon,
      value: '掼蛋🏗️'
    },
    {
      image: mangoIcon,
      value: '果果清单🏗️'
    },
    {
      image: sportIcon,
      value: '运动还债🏗️'
    },
    {
      image: pointPointPointIcon,
      value: '敬请期待🏗️'
    },
  ]

  const handleGridClick = (item: object, index: number) => {
    console.debug('handleGridClick, item', item)
    switch (index) {
      case 1:
        Taro.navigateTo({
          url: '../mahjong/index'
        })
        break;
      default:
        console.log('rain ', index)
        Taro.atMessage({
            'message': "建设中，程序员正在骑马赶来的路上...🐎",
            'type': 'info',
          }
        )
    }
  }

  return (
    <>
      <AtMessage/>
      {
        ready &&
        <View className='container'>
          <AtNoticebar single marquee speed={50}>{notifyMessage}</AtNoticebar>

          <View className='userInfo'>
            <View className='avatarWrapper'>
              <AtAvatar size="large" image={userService.getUserAvatar(currentUser.id)}></AtAvatar>
            </View>

            <View className={'detailWrapperWrapper'}>
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

export default MainPage
