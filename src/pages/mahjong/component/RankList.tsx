import './RankList.scss'
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Image, Text, View} from "@tarojs/components";
import {AtAvatar} from "taro-ui";
import coinIcon from "../../../assets/images/硬币.png";
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
        ...user
      }
    ))
    setRankList(rankList);
  }, [userList]);

  return <>
    {
      rankList?.map(rankItem =>
        <View className={'randItem'}>
          <View className='avatar'>
            <AtAvatar circle size={'normal'} image={rankItem?.avatar}></AtAvatar>
          </View>
          <View className='detail'>
            <View className={'detailContent'}>
              <View className={'nickname'}>
                <Text>{rankItem?.nickname}</Text>
              </View>
              <View className={'asset'}>
                <Image className={'coin'} src={coinIcon}></Image>
                <Text className={'assetNumber'}>{1}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
  </>
}

export default RankList
