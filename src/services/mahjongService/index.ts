import api from '../api'
import store from "../../store";
import {setPlayerIds, setUserTags} from "../../store/mahjongSlice";
import MahjongRoundInfo = App.MahjongRoundInfo;

const getPlayUserIdList = async () => {
  const playUserIdList = await api.sendGet(`/api/mahjong/palyer/ids`)
  store.dispatch(setPlayerIds(playUserIdList))
  return playUserIdList
}

const addPalyUser = (id: number) => {
  return api.sendPost(`/api/mahjong/palyer?id=${id}`, null)
}

const deletePlayUser = (id: number) => {
  return api.sendDelete(`/api/mahjong/palyer?id=${id}`, null)
}

const saveMahjongRoundInfo = (roundInfo: MahjongRoundInfo) => {
  return api.sendPost(`/api/mahjong/round`, roundInfo)
}

const getUserTage = async (userIds: number[]) => {
  const userTags = await api.sendPost(`/api/mahjong/getUserTags`, userIds)
  store.dispatch(setUserTags(userTags))
  return userTags
}

// const getRecords = async (pageNumber: number, pageSize: number): Promise<MahjongRecordInfo[]> => {
//   // const re = api.sendGet(`/api/mahjong/records?pageNumber=${pageNumber}&pageSize=${pageSize}`)
// }

export default {
  getPlayUserIdList,
  addPalyUser,
  deletePlayUser,
  saveMahjongRoundInfo,
  getUserTage,
  // getRecords,
}

