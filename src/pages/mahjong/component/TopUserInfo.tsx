import {View} from "@tarojs/components";

import './TopUserInfo.scss'
import UserInfo = App.UserInfo;

interface TopUserInfoProps {
  userInfo: UserInfo | undefined
}

const TopUserInfo = (props: TopUserInfoProps) => {
  const userInfo = props.userInfo

  return <>
    <View className='userInfo'>
      <View>{userInfo?.nickname}</View>
    </View>
  </>
}

export default TopUserInfo
