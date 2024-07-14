import './GameLog.scss'
import {Text, View} from "@tarojs/components";
import {useSelector} from "react-redux";
import {AtAvatar, AtTag} from "taro-ui";
import {useEffect, useState} from "react";
import MahjongLog = App.MahjongLog;
import userService from 'src/services/userService';

const GameLog = () => {
  const logs: MahjongLog[] = useSelector((state: any) => state.mahjong.logs)

  const [logList, setLogList] = useState<any[]>()

  useEffect(() => {
    const userLogList = logs.map(log => (
      {
        ...log,
        winnerAvatar: log.winners[0].userAvatar,
        loserAvatar: log.losers[0].userAvatar,
      }
    ))
    setLogList(userLogList)

  }, [logs]);

  const showScore = (score: number) => {
    return score > 0 ? '+' + score : '' + score
  }

  return <>
    <View className={'gameLogContainer'}>
      {
        logList?.map(log =>
          <View className={'logItem'}>
            <View className={'logItemAvatar'}>
              <AtAvatar size={'small'} image={userService.getUserAvatar(log.winnerAvatar.userId)}></AtAvatar>
            </View>

            <View className={'logItemLogInfo'}>
              <View className={'logItemTagList'}>
                <View>
                  {
                    log.gameTags.map((x: any) => (
                      <AtTag className={'logItemTag'} size={'small'} active>{x}</AtTag>
                    ))
                  }
                </View>
                <View>
                  <AtTag className={'logItemTag'} size={'small'} active>{log.createTime}</AtTag>
                </View>
              </View>

              <View className={'logItemDetail'}>
                <View className={'logItemWinInfo'}>
                  {
                    log.winners.map((x: any) =>
                      <View>
                        <Text className={'logItemName logItemFontSize'}>{x.userName}</Text>
                        <Text className={'logItemName logItemFontSize'}>{' : '}</Text>
                        <Text className={'logItemWinScore logItemFontSize'}>{showScore(x.score)}</Text>
                      </View>
                    )
                  }
                  {
                    <View>
                      <Text className={'logItemName logItemFontSize'}>{log.recorderName}</Text>
                      <Text className={'logItemAward logItemFontSize'}>{' [奖]'}</Text>
                      <Text className={'logItemName logItemFontSize'}>{' : '}</Text>
                      <Text className={'logItemWinScore logItemFontSize'}>{showScore(log.recorderAward)}</Text>
                    </View>
                  }
                </View>

                <View className={'logItemLoseInfo'}>
                  {
                    log.losers.map((x: any) =>
                      <View>
                        <Text className={'logItemName logItemFontSize'}>{x.userName}</Text>
                        <Text className={'logItemAsset logItemFontSize'}>{' : '}</Text>
                        <Text className={'logItemLoseScore logItemFontSize'}>{showScore(x.score)}</Text>
                      </View>
                    )
                  }
                </View>
              </View>
            </View>
          </View>
        )
      }
    </View>
  </>
}

export default GameLog
