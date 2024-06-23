import {View} from "@tarojs/components";

import './index.scss'
import {AtButton, AtDrawer, AtMessage, AtTabs, AtTabsPane} from "taro-ui";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TopUserInfo, {TopUserType} from "./component/TopUserInfo";
import GameRound from "./component/GameRound";
import UserInfo = App.UserInfo;
import mahjongService from "../../services/mahjongService";

const tabList = [{title: '今日榜单'}, {title: '麻将流水'}]

function Index() {
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)

  const [selectTabIndex, setSelectTabIndex] = useState(0);
  const [topUser, setTopUser] = useState<UserInfo>()
  const [bottomUser, setBottomUser] = useState<UserInfo>()
  // Rain test
  const [showDrawer, setShowDrawer] = useState(true)

  useEffect(() => {
    mahjongService.getPlayUserIdList()
  }, [showDrawer]);

  useEffect(() => {
    const users = [...userList]
    users.sort((a, b) => a.copperCoin - b.copperCoin)
    setTopUser(users[users.length - 1])
    setBottomUser(users[0])
  }, [userList])

  return (
    <>
      <View className='container containerExt'>
        <AtMessage/>

        <View className='topUserInfo'>
          <TopUserInfo userInfo={topUser} type={TopUserType.TOP}></TopUserInfo>
          <TopUserInfo userInfo={bottomUser} type={TopUserType.BOTTOM}></TopUserInfo>
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

        {/*<AtButton  className={'bottomButton'} type={'primary'} onClick={() => setShowDrawer(true)}>{'记录游戏'}</AtButton>*/}
        <AtButton className={'bottomButton'} type={'secondary'} onClick={() => setShowDrawer(true)}>{'记录游戏'}</AtButton>

        <AtDrawer show={showDrawer} mask onClose={() => setShowDrawer(false)} right width={'100%'}>
          <GameRound setShowDrawer={setShowDrawer}></GameRound>
        </AtDrawer>
      </View>
    </>
  )
}

export default Index
