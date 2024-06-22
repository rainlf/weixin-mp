import {Text, View} from "@tarojs/components";

import './GameRound.scss'
import {AtGrid, AtSlider, AtTag} from "taro-ui";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {AtGridItem} from "taro-ui/types/grid";
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
  const userList: UserInfo[] = useSelector((state: any) => state.userList.value)

  const [gridData, setGridData] = useState<AtGridItem[]>([])
  const [winerCaseList, setWinerCaseList] = useState(initWinerCaseList)
  const [fanList, setFanList] = useState(initFanList)
  const [baseFan, setBaseFan] = useState(0)
  const [totalFan, setTotalFan] = useState(0)

  useEffect(() => {
    const rainxx: AtGridItem[] = userList.map(user => (
      {
        value: user.nickname,
        image: user.avatar
      }
    ))
    setGridData(rainxx)
  }, [userList])

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

  return <>
    <View className={'gameRoundContainer'}>
      <View className={'userList'}>
        <AtGrid data={gridData} mode={'rect'} columnNum={3}/>
      </View>
      <View className={'title'}>
        <Text>{"赢家"}</Text>
      </View>
      <View className={'tagList'}>
        {
          winerCaseList.map(x =>
            <AtTag className={'tag'} circle name={x.name} active={x.click}
                   onClick={handleWinerCaseClick}>{x.value}</AtTag>
          )
        }
      </View>
      <View className={'title'}>
        <Text>{"牌型"}</Text>
      </View>
      <View className={'tagList'}>
        {
          fanList.map(x =>
            <AtTag className={'tag'} circle name={x.name} active={x.click}
                   onClick={handleFanListClick}>{x.value}</AtTag>
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
    </View>
  </>
}

export default GameRound;
