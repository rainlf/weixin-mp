import {Image, Text, View} from "@tarojs/components";

import './TopUserInfo.scss'
import {AtAvatar} from "taro-ui";

import coinIcon from "../../../assets/images/硬币.png"
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

  const isTop: boolean = TopUserType.TOP === props.type
  const text: string = isTop ? '全场最佳' : '全场垫底'
  const textColor: string = isTop ? 'topText' : 'bottomText'
  const asset: string = isTop ? '+' + userInfo?.copperCoin : '' + userInfo?.copperCoin
  const assetColor: string = isTop ? 'topAsset' : 'bottomAsset';

  return <>
    <View className='userInfo'>
      <View className={'verticalText ' + textColor}>
        <Text>{text}</Text>
      </View>
      <View className='avatar'>
        <AtAvatar circle image={userInfo?.avatar}></AtAvatar>
      </View>
      <View className='detail'>
        <View className={'detailContent'}>
          <View className={'nickname'}>
            <Text>{userInfo?.nickname}</Text>
          </View>
          <View className={'asset'}>
            <Image className={'coin'} src={coinIcon}></Image>
            <Text className={'assetNumber ' + assetColor}>{asset}</Text>
          </View>
        </View>
      </View>
    </View>
  </>
}

export default TopUserInfo
