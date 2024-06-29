import {Image, Text, View} from "@tarojs/components";

import './TopUserInfo.scss'
import {AtAvatar} from "taro-ui";

import coinIcon from "../../../assets/images/铜币.png"
import {useEffect, useState} from "react";
import UserInfo = App.UserInfo;

export enum TopUserType {
  TOP,
  BOTTOM,
}

interface TopUserInfoProps {
  userInfo: UserInfo | undefined
  type: TopUserType
}

const TopUserInfo = (props: TopUserInfoProps) => {
  const userInfo = props.userInfo
  const type = props.type

  const [topUser, setTopUser] = useState<any>({})

  useEffect(() => {
    if (type === TopUserType.TOP) {
      setTopUser({
        avatar: userInfo?.avatar,
        name: userInfo?.nickname,
        title: '全场最佳',
        titleColor: 'topText',
        score: '+' + userInfo?.copperCoin,
        scoreColor: 'topAsset',
      })
    } else {
      setTopUser({
        avatar: userInfo?.avatar,
        name: userInfo?.nickname,
        title: '全场最菜',
        titleColor: 'bottomText',
        score: '' + userInfo?.copperCoin,
        scoreColor: 'bottomAsset',
      })
    }

  }, [userInfo, type]);

  return <>
    <View className='topUserContainer'>
      <View className={'verticalText ' + topUser.titleColor}>
        <Text>{topUser.title}</Text>
      </View>
      <View className='avatar'>
        <AtAvatar size={'small'} image={topUser.avatar}></AtAvatar>
      </View>
      <View className='detail'>
        <View className={'detailContent'}>
          <View className={'nickname'}>
            <Text>{topUser.name}</Text>
          </View>
          <View className={'asset'}>
            <Image className={'coin'} src={coinIcon}></Image>
            <Text className={'assetNumber ' + topUser.scoreColor}>{topUser.score}</Text>
          </View>
        </View>
      </View>
    </View>
  </>
}

export default TopUserInfo
