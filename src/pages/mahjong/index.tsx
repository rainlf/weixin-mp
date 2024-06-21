import {View} from "@tarojs/components";

import './index.scss'
import {AtButton, AtMessage, AtTabs, AtTabsPane} from "taro-ui";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TopUserInfo from "./component/TopUserInfo";
import Taro from "@tarojs/taro";
import UserInfo = App.UserInfo;

const tabList = [{title: '标签页1'}, {title: '标签页2'}]

function Index() {
  const userList: UserInfo[] = useSelector((state: any) => state.userList.value)

  const [selectTabIndex, setSelectTabIndex] = useState(0);
  const [topUser, setTopUser] = useState<UserInfo>()
  const [bottomUser, setBottomUser] = useState<UserInfo>()


  useEffect(() => {
    const users = [...userList]
    users.sort((a, b) => a.copperCoin - b.copperCoin)
    setTopUser(users[users.length - 1])
    setBottomUser(users[0])
  }, [userList])

  return (
    <>
      <View className='container'>
        <AtMessage/>

        <View className='topUserInfo'>
          <TopUserInfo userInfo={topUser}></TopUserInfo>
          <TopUserInfo userInfo={bottomUser}></TopUserInfo>
        </View>


        <View className='gameInfo'>
          <AtTabs current={selectTabIndex} tabList={tabList} onClick={(index: number) => setSelectTabIndex(index)}>
            <AtTabsPane current={selectTabIndex} index={0}>
              <View>标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={selectTabIndex} index={1}>
              <View>标签页二的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>

        <AtButton className='submitGame' type='primary' onClick={() => {
          Taro.atMessage({
              'message': "xxxxx",
              'type': 'success',
            }
          )
        }}>test</AtButton>
      </View>
    </>
  )
}

export default Index
