import {Text, View} from "@tarojs/components";

import './GameRound.scss'
import {AtButton, AtSlider, AtTag} from "taro-ui";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Taro from "@tarojs/taro";
import UserInfo = App.UserInfo;


const initWinerCaseList: any[] = [
  {name: 0, value: "胡牌", click: true},
  {name: 1, value: "自摸", click: false},
  {name: 2, value: "一炮双响", click: false},
  {name: 3, value: "一炮三响", click: false},
]

const initFanList: any[] = [
  {name: 0, value: "门清", click: false},
  {name: 1, value: "碰碰胡", click: false},
  {name: 2, value: "清一色", click: false},
  {name: 3, value: "大吊车", click: false},
  {name: 4, value: "七小对", click: false},
  {name: 5, value: "杠开", click: false},
]

const GameRound = () => {
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)
  const playerIdList: number[] = useSelector((state: any) => state.mahjong.playerIds)

  const [winerCaseList, setWinerCaseList] = useState(initWinerCaseList)
  const [fanList, setFanList] = useState(initFanList)
  const [baseFan, setBaseFan] = useState(0)
  const [totalFan, setTotalFan] = useState(0)
  const [gameUserList, setGameUserList] = useState<any[]>([])
  const [palyUserList, setPlayUserList] = useState<any[]>([])

  useEffect(() => {
    setGameUserList(userList
      .filter(user => !palyUserList.includes(user.id))
      .map(user => (
        {
          id: user.id + '',
          name: user.nickname,
        }
      )))

    setPlayUserList(userList
      .filter(user => palyUserList.includes(user.id))
      .map(user => (
        {
          id: user.id + '',
          name: user.nickname,
          win: false,
          lose: false,
        }
      )))
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
    const currentList = winerCaseList.map(x => x.name === event.name ? {
      ...x,
      click: !x.click,
    } : {
      ...x,
      click: false,
    })

    if (currentList.every(x => x.click === false)) {
      setWinerCaseList(initWinerCaseList)
    } else {
      setWinerCaseList(currentList)
    }
  }

  const handleFanListClick = (event: any) => {
    setFanList(fanList.map(x => x.name === event.name ? {
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
    const selectUser = gameUserList.filter(x => x.id === userId)[0]
    setGameUserList(gameUserList.filter(x => x.id !== selectUser.id))
    setPlayUserList([
      ...palyUserList,
      selectUser,
    ])
  }

  const handlePlayUserClick = (event) => {
    console.log('rain', event.name)
  }

  const handleGameUserLongPress = (event: any) => {
    console.log(event)
    console.log(event.currentTarget.id)
  }

  return <>
    <View className={'gameRoundContainer'}>
      <View className={'title'}>
        <Text>{"玩家"}</Text>
      </View>
      <View className={'userList'}>
        {
          gameUserList.map(x =>
            <AtTag className={'tag'} circle name={x.id} onClick={handleGameUserClick}>
              {x.name}
            </AtTag>
          )
        }
      </View>
      <View className={'title'}>
        <Text>{"场上玩家"}</Text>
      </View>
      <View className={'gameUserList'}>
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
                <View id={x.id} onLongPress={handleGameUserLongPress}>
                  <AtTag className={'tag'} name={x.id} active onClick={handlePlayUserClick}>
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
            <AtTag className={'tag'} circle name={x.name} active={x.click} onClick={handleWinerCaseClick}>
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
            <AtTag className={'tag'} circle name={x.name} active={x.click} onClick={handleFanListClick}>
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
        <AtButton className={'button'} type={'secondary'}>取消</AtButton>
        <AtButton className={'button'} type={'primary'}>确认</AtButton>
      </View>
    </View>
  </>
}

export default GameRound;
