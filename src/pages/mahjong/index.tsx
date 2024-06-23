import {View} from "@tarojs/components";

import './index.scss'
import {AtButton, AtMessage, AtTabs, AtTabsPane} from "taro-ui";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import TopUserInfo, {TopUserType} from "./component/TopUserInfo";
import RankList from "./component/RankList";
import GameLog from "./component/GameLog";
import mahjongService from "../../services/mahjongService";
import userService from "../../services/userService";
import Taro from "@tarojs/taro";
import UserInfo = App.UserInfo;

const tabList = [{title: '今日榜单'}, {title: '麻将流水'}]

function Index() {
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)

  const [selectTabIndex, setSelectTabIndex] = useState(0);
  const [topUser, setTopUser] = useState<UserInfo>()
  const [bottomUser, setBottomUser] = useState<UserInfo>()

  useEffect(() => {
    mahjongService.getPlayUserIdList()
    mahjongService.getUserTags(userList.map(x => x.id))
    mahjongService.getLogs()
    userService.getUserList()
    userService.getCurrentUser()
  }, []);

  useEffect(() => {
    const users = [...userList]
    users.sort((a, b) => a.copperCoin - b.copperCoin)
    setTopUser(users[users.length - 1])
    setBottomUser(users[0])
  }, [userList])

  const jump2Round = () => {
    Taro.navigateTo({
      url: '../mahjongRound/index',
      success: () => {
        Taro.atMessage({
            'message': "辛苦咯~",
            'type': 'info',
          }
        )
      }
    })
  }

  return (
    <>
      <AtMessage/>
      <View className='container mahjongContainer'>
        <View className='topUserInfo'>
          <TopUserInfo userInfo={topUser} type={TopUserType.TOP}></TopUserInfo>
          <TopUserInfo userInfo={bottomUser} type={TopUserType.BOTTOM}></TopUserInfo>
        </View>

        <View className='gameInfo'>
          <AtTabs current={selectTabIndex} tabList={tabList} onClick={(index: number) => setSelectTabIndex(index)}>
            <AtTabsPane current={selectTabIndex} index={0}>
              <RankList></RankList>
            </AtTabsPane>
            <AtTabsPane current={selectTabIndex} index={1}>
              <GameLog></GameLog>
            </AtTabsPane>
          </AtTabs>
        </View>

        <View className={'buttonInfo'}>
          <AtButton className={'button'} type={'secondary'} onClick={jump2Round}>{'记录游戏'}</AtButton>
        </View>
      </View>
    </>
  )
}

export default Index
