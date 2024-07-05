import {Text, View} from "@tarojs/components";

import './index.scss'
import {AtButton, AtInputNumber, AtMessage, AtTag} from "taro-ui";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Taro from "@tarojs/taro";
import mahjongService from "../../services/mahjongService";
import userService from "../../services/userService";
import UserInfo = App.UserInfo;

interface WinCase {
  name: WinCaseEnum,
  value: string,
  click: boolean
}

enum WinCaseEnum {
  MJ_COMMON_WIN,
  MJ_SELF_TOUCH_WIN,
  // MJ_ONE_PAO_DOUBLE_WIN,
  // MJ_ONE_PAO_TRIPLE_WIN,
}

const initWinCaseList: WinCase[] = [
  {name: WinCaseEnum.MJ_COMMON_WIN, value: "平赢", click: true},
  {name: WinCaseEnum.MJ_SELF_TOUCH_WIN, value: "自摸", click: false},
  // {name: WinCaseEnum.MJ_ONE_PAO_DOUBLE_WIN, value: "一炮双响", click: false},
  // {name: WinCaseEnum.MJ_ONE_PAO_TRIPLE_WIN, value: "一炮三响", click: false},
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

const GameRoundPage = () => {
  const user: UserInfo = useSelector((state: any) => state.currentUser.user)
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)
  const playerIdList: number[] = useSelector((state: any) => state.mahjong.playerIds)

  const [winCaseList, setWinCaseList] = useState(initWinCaseList)
  const [fanList, setFanList] = useState(initFanList)
  const [baseFan, setBaseFan] = useState(0)
  const [totalFan, setTotalFan] = useState(0)
  const [gameUserList, setGameUserList] = useState<GameUser[]>([])
  const [palyUserList, setPlayUserList] = useState<PlayUser[]>([])

  useEffect(() => {
    const initGameUserList = userList
      .filter(user => !playerIdList.includes(user.id))
      .map(user => ({id: user.id, name: user.nickname,}))
    setGameUserList(initGameUserList)

    const initPlayUserList = userList
      .filter(user => playerIdList.includes(user.id))
      .map(user => ({id: user.id, name: user.nickname, status: 0,}))
    setPlayUserList(initPlayUserList)
  }, [userList, playerIdList])

  useEffect(() => {
    let fan = baseFan
    fan = fan << fanList.filter(x => x.click).length

    let index = winCaseList.filter(x => x.click)[0].name
    if (index === 1) {
      fan = fan * 3
    }

    setTotalFan(fan)
  }, [baseFan, fanList, winCaseList])


  const handleWinCaseClick = (event: any) => {
    const tmpWinCaseList = winCaseList.map(x => x.name == event.name ? {...x, click: !x.click,} : {...x, click: false,})

    // // 非自摸一定不杠开
    // if (!tmpWinCaseList.filter(x => x.name = WinCaseEnum.MJ_SELF_TOUCH_WIN)[0].click) {
    //   setFanList(fanList.map(x => x.name == FanEnum.MJ_FLOWER_OPEN_FAN ? {...x, click: false} : x))
    // }

    // 没有选择则默认平赢
    if (tmpWinCaseList.every(x => !x.click)) {
      setWinCaseList(initWinCaseList)
    } else {
      setWinCaseList(tmpWinCaseList)
    }
  }

  const handleFanListClick = (event: any) => {
    let fans = fanList.map(x => x.name == event.name ? {...x, click: !x.click,} : x)

    // // 七小对一定门清
    // if (fans.filter(x => x.name == FanEnum.MJ_SEVEN_PAIR_FAN)[0].click) {
    //   fans = fans.map(x => x.name == FanEnum.MJ_DOOR_CLEAN_FAN ? {...x, click: true} : x)
    // }
    //
    // // 非门清一定不七小对
    // if (!fans.filter(x => x.name == FanEnum.MJ_DOOR_CLEAN_FAN)[0].click) {
    //   fans = fans.map(x => x.name == FanEnum.MJ_SEVEN_PAIR_FAN ? {...x, click: false} : x)
    // }
    //
    // // 杠开一定自摸
    // if (fans.filter(x => x.name == FanEnum.MJ_FLOWER_OPEN_FAN)[0].click) {
    //   setWinCaseList(winCaseList.map(x => x.name == WinCaseEnum.MJ_SELF_TOUCH_WIN ? {...x, click: true} : {
    //     ...x,
    //     click: false,
    //   }))
    // }

    setFanList(fans)
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

    const selectWinCaseList = winCaseList.filter(x => x.click)
    if (selectWinCaseList.length != 1) {
      if (baseFan == 0) {
        Taro.atMessage({
          'message': "只能选择一种胡牌类型哦",
          'type': 'warning',
        })
        return
      }
    }

    const selectWinCase = selectWinCaseList[0]
    let winnerIds: number[] = [];
    let loserIds: number[] = [];
    if (selectWinCase.name == WinCaseEnum.MJ_COMMON_WIN) {
      winnerIds = palyUserList.filter(x => x.status == PlayUserStatus.WIN).map(x => x.id)
      loserIds = palyUserList.filter(x => x.status == PlayUserStatus.LOSE).map(x => x.id)
      if (winnerIds.length != 1 || loserIds.length != 1) {
        Taro.atMessage({
          'message': "平赢，要1赢1输哦",
          'type': 'warning',
        })
        return
      }

    }

    if (selectWinCase.name == WinCaseEnum.MJ_SELF_TOUCH_WIN) {
      winnerIds = palyUserList.filter(x => x.status == PlayUserStatus.WIN).map(x => x.id)
      loserIds = palyUserList.filter(x => x.status != PlayUserStatus.WIN).map(x => x.id)
      if (winnerIds.length != 1 || loserIds.length != 3) {
        Taro.atMessage({
          'message': "自摸，要选定1个赢家哦",
          'type': 'warning',
        })
        return
      }
    }

    // if (selectWinCase.name == WinCaseEnum.MJ_ONE_PAO_DOUBLE_WIN) {
    //   winnerIds = palyUserList.filter(x => x.status == PlayUserStatus.WIN).map(x => x.id)
    //   loserIds = palyUserList.filter(x => x.status == PlayUserStatus.LOSE).map(x => x.id)
    //   if (winnerIds.length != 2 || loserIds.length != 1) {
    //     Taro.atMessage({
    //       'message': "一炮双响，要2赢1输哦",
    //       'type': 'warning',
    //     })
    //     return
    //   }
    // }
    //
    // if (selectWinCase.name == WinCaseEnum.MJ_ONE_PAO_TRIPLE_WIN) {
    //   winnerIds = palyUserList.filter(x => x.status != PlayUserStatus.LOSE).map(x => x.id)
    //   loserIds = palyUserList.filter(x => x.status == PlayUserStatus.LOSE).map(x => x.id)
    //   if (winnerIds.length != 3 || loserIds.length != 1) {
    //     Taro.atMessage({
    //       'message': "一炮三响，要选定1个输家哦",
    //       'type': 'warning',
    //     })
    //     return
    //   }
    // }

    const roundInfo = {
      recorderId: user.id,
      winnerIds,
      loserIds,
      winCase: selectWinCase.name,
      baseFan,
      fanList: fanList.filter(x => x.click).map(x => x.name),
    }

    Taro.navigateBack({
      delta: 1
    })

    mahjongService.saveMahjongRoundInfo(roundInfo)
      .then(() => {
          mahjongService.getPlayUserIdList()
          mahjongService.getUserTags(userList.map(x => x.id))
          mahjongService.getLogs()
          userService.getUserList()
          userService.getCurrentUser()
          Taro.atMessage({
            'message': "保存成功，获得奖励💰",
            'type': 'info',
          })
        }
      )
  }

  return <>
    <AtMessage/>
    <View className={'gameRoundContainer'}>
      <View className={'title'}>
        <Text>{"玩家"}</Text>
      </View>
      <View className={'tagList userList'}>
        {
          gameUserList.map(x =>
            <AtTag className={'tag'} name={x.id + ''} onClick={handleGameUserClick}>
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
        <Text>{"胡牌"}</Text>
      </View>
      <View className={'tagList'}>
        {
          winCaseList.map(x =>
            <AtTag className={'tag'} circle name={x.name + ''} active={x.click} onClick={handleWinCaseClick}>
              {x.value}
            </AtTag>
          )
        }
      </View>
      <View className={'title'}>
        <Text>{"牌型"}</Text>
      </View>
      <View className={'tagList fanList'}>
        {
          fanList.map(x =>
            <AtTag className={'tag'} circle name={x.name + ''} active={x.click} onClick={handleFanListClick}>
              {x.value}
            </AtTag>
          )
        }
      </View>
      <View className={'title numberSliderTitle'}>
        <Text>{"底分（花+1）：" + baseFan}</Text>
        <Text>{"总分：" + totalFan}</Text>
      </View>
      <View className={'numberSlider'}>
        <AtInputNumber type={'number'} min={0} max={20} step={1} value={baseFan}
                       onChange={(num: number) => setBaseFan(num)}/>
      </View>
      <View className={'bottomButton'}>
        <AtButton className={'button'} type={'primary'} onClick={() => handleSaveGameRound()}>确认</AtButton>
      </View>
    </View>
  </>
}

export default GameRoundPage;
