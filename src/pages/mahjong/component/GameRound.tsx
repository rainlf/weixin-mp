import {Text, View} from "@tarojs/components";

import './GameRound.scss'
import {AtButton, AtSlider, AtTag} from "taro-ui";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Taro from "@tarojs/taro";
import mahjongService from "../../../services/mahjongService";
import UserInfo = App.UserInfo;

interface WinerCase {
  name: WinerCaseEnum,
  value: string,
  click: boolean
}

enum WinerCaseEnum {
  MJ_COMMON_WIN,
  MJ_SELF_TOUCH_WIN,
  MJ_ONE_PAO_DOUBLE_WIN,
  MJ_ONE_PAO_TRIPLE_WIN,
}

const initWinerCaseList: WinerCase[] = [
  {name: WinerCaseEnum.MJ_COMMON_WIN, value: "胡牌", click: true},
  {name: WinerCaseEnum.MJ_SELF_TOUCH_WIN, value: "自摸", click: false},
  {name: WinerCaseEnum.MJ_ONE_PAO_DOUBLE_WIN, value: "一炮双响", click: false},
  {name: WinerCaseEnum.MJ_ONE_PAO_TRIPLE_WIN, value: "一炮三响", click: false},
]

enum FanEnum {
  MJ_DOOR_CLEAN_FAN,
  MJ_PENG_PENG_FAN,
  MJ_SAME_COLOR_FAN,
  MJ_BIG_CRANE_FAN,
  MJ_SEVEN_PAIR_FAN,
  MJ_FLOWER_OPEN_FAN,
}

interface Fan {
  name: FanEnum,
  value: string,
  click: boolean
}

const initFanList: Fan[] = [
  {name: FanEnum.MJ_DOOR_CLEAN_FAN, value: "门清", click: false},
  {name: FanEnum.MJ_PENG_PENG_FAN, value: "碰碰胡", click: false},
  {name: FanEnum.MJ_SAME_COLOR_FAN, value: "清一色", click: false},
  {name: FanEnum.MJ_BIG_CRANE_FAN, value: "大吊车", click: false},
  {name: FanEnum.MJ_SEVEN_PAIR_FAN, value: "七小对", click: false},
  {name: FanEnum.MJ_FLOWER_OPEN_FAN, value: "杠开", click: false},
]

interface GameUser {
  id: number,
  name: string,
}

interface PlayUser {
  id: number,
  name: string,
  status: number,
}

enum PlayUserStatus {
  BASE,
  WIN,
  LOSE,
}

const playUserColorMap = {
  0: "playUserBaseStatus",
  1: "playUserWinStatus",
  2: "playUserLoseStatus",
}

const GameRound = ({setShowDrawer}: {
  setShowDrawer: (visible: boolean) => void
}) => {
  const user: UserInfo = useSelector((state: any) => state.currentUser.user)
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)
  const playerIdList: number[] = useSelector((state: any) => state.mahjong.playerIds)

  const [winerCaseList, setWinerCaseList] = useState(initWinerCaseList)
  const [fanList, setFanList] = useState(initFanList)
  const [baseFan, setBaseFan] = useState(0)
  const [totalFan, setTotalFan] = useState(0)
  const [gameUserList, setGameUserList] = useState<GameUser[]>([])
  const [palyUserList, setPlayUserList] = useState<PlayUser[]>([])

  useEffect(() => {
    const initGameUserList = userList
      .filter(user => !playerIdList.includes(user.id))
      .map(user => (
        {
          id: user.id,
          name: user.nickname,
        }
      ))
    setGameUserList(initGameUserList)

    const initPlayUserList = userList
      .filter(user => playerIdList.includes(user.id))
      .map(user => (
        {
          id: user.id,
          name: user.nickname,
          status: 0,
        }
      ))
    setPlayUserList(initPlayUserList)
  }, [userList, playerIdList])

  useEffect(() => {
    let fan = baseFan
    fan = fan << fanList.filter(x => x.click).length

    let index = winerCaseList.filter(x => x.click)[0].name
    if (index === 1) {
      fan = fan * 3
    }

    setTotalFan(fan)
  }, [baseFan, fanList, winerCaseList])

  const handleWinerCaseClick = (event: any) => {
    const currentList = winerCaseList.map(x => x.name == event.name ? {
      ...x,
      click: !x.click,
    } : {
      ...x,
      click: false,
    })

    if (currentList.every(x => !x.click)) {
      setWinerCaseList(initWinerCaseList)
    } else {
      setWinerCaseList(currentList)
    }
  }

  const handleFanListClick = (event: any) => {
    setFanList(fanList.map(x => x.name == event.name ? {
      ...x,
      click: !x.click,
    } : x))
  }

  const handleGameUserClick = (event: any) => {
    if (palyUserList.length >= 4) {
      Taro.atMessage({
        'message': "牌桌已满，长按玩家赶下牌桌",
        'type': 'info',
      })
      return
    }

    const userId = event.name
    const selectUser = gameUserList.filter(x => x.id == userId)[0]
    setGameUserList(gameUserList.filter(x => x.id != selectUser.id))
    setPlayUserList([
      ...palyUserList,
      {
        ...selectUser,
        status: 0
      },
    ])

    mahjongService.addPalyUser(userId)
  }

  const handlePlayUserClick = (event: any) => {
    const userId = event.name
    setPlayUserList(palyUserList.map(x => {
        return (x.id == userId) ? {
          ...x,
          status: x.status + 1 < 3 ? x.status + 1 : 0
        } : x
      }
    ))
  }

  const handleGameUserLongPress = (event: any) => {
    const userId = event.currentTarget.id
    const selectUser = palyUserList.filter(x => x.id == userId)[0]
    setGameUserList([
      ...gameUserList,
      selectUser,
    ])
    setPlayUserList(palyUserList.filter(x => x.id != selectUser.id))

    mahjongService.deletePlayUser(userId)
  }

  const handleSaveGameRound = () => {
    console.log('rain 1', palyUserList)
    console.log('rain 2', winerCaseList)
    console.log('rain 3', fanList)
    console.log('rain 4', baseFan)
    console.log('rain 5', user)

    if (palyUserList.length != 4) {
      Taro.atMessage({
        'message': "场上玩家要有4人哦",
        'type': 'warning',
      })
      return
    }

    if (baseFan == 0) {
      Taro.atMessage({
        'message': "请选择基础积分",
        'type': 'warning',
      })
      return
    }

    const selectWinerCaseList = winerCaseList.filter(x => x.click)
    if (selectWinerCaseList.length != 1) {
      if (baseFan == 0) {
        Taro.atMessage({
          'message': "只能选择一种和牌类型哦",
          'type': 'warning',
        })
        return
      }
    }

    const selectWinerCase = selectWinerCaseList[0]
    if (selectWinerCase.name == WinerCaseEnum.MJ_COMMON_WIN) {
      const winerList = palyUserList.filter(x => x.status == PlayUserStatus.WIN)
      const loserList = palyUserList.filter(x => x.status == PlayUserStatus.LOSE)
      if (winerList.length != 1 || loserList.length != 1) {
        Taro.atMessage({
          'message': "胡牌，要1赢1输哦",
          'type': 'warning',
        })
        return
      }
    }

    if (selectWinerCase.name == WinerCaseEnum.MJ_SELF_TOUCH_WIN) {
      const winerList = palyUserList.filter(x => x.status == PlayUserStatus.WIN)
      const loserList = palyUserList.filter(x => x.status != PlayUserStatus.WIN)
      if (winerList.length != 1 || loserList.length != 3) {
        Taro.atMessage({
          'message': "自摸，要选定赢家哦",
          'type': 'warning',
        })
        return
      }
    }

    if (selectWinerCase.name == WinerCaseEnum.MJ_ONE_PAO_DOUBLE_WIN) {
      const winerList = palyUserList.filter(x => x.status == PlayUserStatus.WIN)
      const loserList = palyUserList.filter(x => x.status == PlayUserStatus.LOSE)
      if (winerList.length != 2 || loserList.length != 1) {
        Taro.atMessage({
          'message': "一炮双响，要2赢1输哦",
          'type': 'warning',
        })
        return
      }
    }

    if (selectWinerCase.name == WinerCaseEnum.MJ_ONE_PAO_TRIPLE_WIN) {
      const winerList = palyUserList.filter(x => x.status != PlayUserStatus.LOSE)
      const loserList = palyUserList.filter(x => x.status == PlayUserStatus.LOSE)
      if (winerList.length != 3 || loserList.length != 1) {
        Taro.atMessage({
          'message': "一炮三响，要选定输家哦",
          'type': 'warning',
        })
        return
      }
    }



  }

  return <>
    <View className={'gameRoundContainer'}>
      <View className={'title'}>
        <Text>{"玩家"}</Text>
      </View>
      <View className={'userList'}>
        {
          gameUserList.map(x =>
            <AtTag className={'tag'} circle name={x.id + ''} onClick={handleGameUserClick}>
              {x.name}
            </AtTag>
          )
        }
      </View>
      <View className={'title playerTitle'}>
        <Text>{"场上玩家"}</Text>
        <View>
          <Text className={'playUserWinStatus'} style={{marginRight: '10rpx'}}>{'赢'}</Text>
          <Text className={'playUserLoseStatus'}>{'输'}</Text>
        </View>
      </View>
      <View className={'tagList'}>
        {
          palyUserList.length === 0 ?
            (
              <>
                <AtTag className={'tag'}>
                  {'暂无玩家'}
                </AtTag>
              </>
            ) :
            (
              palyUserList.map(x =>
                <View id={x.id + ''} onLongPress={handleGameUserLongPress}>
                  <AtTag className={'tag ' + playUserColorMap[x.status]} name={x.id + ''} active
                         onClick={handlePlayUserClick}>
                    {x.name}
                  </AtTag>
                </View>
              )
            )
        }
      </View>
      <View className={'title'}>
        <Text>{"和牌"}</Text>
      </View>
      <View className={'tagList'}>
        {
          winerCaseList.map(x =>
            <AtTag className={'tag'} circle name={x.name + ''} active={x.click} onClick={handleWinerCaseClick}>
              {x.value}
            </AtTag>
          )
        }
      </View>
      <View className={'title'}>
        <Text>{"牌型"}</Text>
      </View>
      <View className={'tagList'}>
        {
          fanList.map(x =>
            <AtTag className={'tag'} circle name={x.name + ''} active={x.click} onClick={handleFanListClick}>
              {x.value}
            </AtTag>
          )
        }
      </View>
      <View className={'title numberSliderTitle'}>
        <Text>{"基础积分：" + baseFan}</Text>
        <Text>{"总积分：" + totalFan}</Text>
      </View>
      <View className={'numberSlider'}>
        <AtSlider min={0} max={20} value={baseFan}
                  activeColor='#96B8F6'
                  blockColor='#78A4F4' blockSize={20}
                  onChange={(number) => setBaseFan(number)}>
        </AtSlider>
      </View>
      <View className={'bottomButton'}>
        <AtButton className={'button'} type={'secondary'} onClick={() => setShowDrawer(false)}>取消</AtButton>
        <AtButton className={'button'} type={'primary'} onClick={() => handleSaveGameRound()}>确认</AtButton>
      </View>
    </View>
  </>
}

export default GameRound;
