import './RankList.scss'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Image, Text, View} from "@tarojs/components";
import {AtAvatar, AtTag} from "taro-ui";

import coinIcon from "../../../assets/images/铜币.png";
import vipCrownIcon from "../../../assets/images/VIP王冠.png";
import goldCrownIcon from "../../../assets/images/金王冠.png";
import silverCrownIcon from "../../../assets/images/银王冠.png";
import copperCrownIcon from "../../../assets/images/铜王冠.png";
import heartBrokenIcon from "../../../assets/images/heart-broken.png";
import UserInfo = App.UserInfo;


//
// interface RankItem {
//   name: string,
//   avatar: string,
// }

const RankList = () => {
  const userList: UserInfo[] = useSelector((state: any) => state.currentUser.userList)

  const [rankList, setRankList] = useState<any[]>()

  useEffect(() => {
    let rankList = userList.map((user: UserInfo) => (
      {
        name: user.nickname,
        avatar: user.avatar,
        score: user.copperCoin > 0 ? '+' + user.copperCoin : '' + user.copperCoin,
        scoreColor: user.copperCoin > 0 ? 'red' : 'green',
        crown: null,
      }
    ))

    rankList.sort((a, b) => +b.score - +a.score)
    rankList.forEach(x => x.crown = null)
    rankList[0].crown = vipCrownIcon
    rankList[1].crown = goldCrownIcon
    rankList[2].crown = silverCrownIcon
    rankList[3].crown = copperCrownIcon
    if (+rankList[rankList.length - 1].score != 0) {
      rankList[rankList.length - 1].crown = heartBrokenIcon
    }

    const zeroList = rankList.filter(x => !(+x.score == 0))
    const noZeroList = rankList.filter(x => !(+x.score != 0))

    setRankList([
      ...zeroList,
      ...noZeroList,
    ]);
  }, [userList]);

  return <>
    {
      rankList?.map(rankItem =>
        <View className={'ranKItem'}>
          <View className='avatar'>
            <AtAvatar size={'small'} image={rankItem.avatar}></AtAvatar>
          </View>
          <View className='detail'>
            <View className={'nickname'}>
              <Text>{rankItem.name}</Text>
            </View>
            <View className={'tags'}>
              <AtTag size={'small'} active>{'AAAA'}</AtTag>
            </View>
          </View>
          <View className={'asset'}>
            <Image className={'coin'} src={coinIcon}></Image>
            <Text
              className={'assetNumber ' + rankItem.scoreColor}>{rankItem.score}</Text>
          </View>
          <View className={'flag'}>
            {
              rankItem.crown && <Image className={'coin'} src={rankItem.crown}></Image>
            }
          </View>
        </View>
      )
    }
  </>
}

export default RankList
