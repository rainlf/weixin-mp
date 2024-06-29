import api from '../api'
import store from "../../store";
import {setLogs, setPlayerIds, setUserTags} from "../../store/mahjongSlice";
import MahjongGameInfo = App.MahjongGameInfo;

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

const saveMahjongRoundInfo = (gameInfo: MahjongGameInfo) => {
  return api.sendPost(`/api/mahjong/game`, gameInfo)
}

const getUserTags = async (userIds: number[]) => {
  const userTags = await api.sendPost(`/api/mahjong/getUserTags`, userIds)
  store.dispatch(setUserTags(userTags))
  return userTags
}

// const getLogs = async (pageNumber: number, pageSize: number) => {
//
// }

const getLogs = async () => {
  const logs = await api.sendGet(`/api/mahjong/logs`)
  store.dispatch(setLogs(logs))
  return logs
}

export default {
  getPlayUserIdList,
  addPalyUser,
  deletePlayUser,
  saveMahjongRoundInfo,
  getUserTags,
  getLogs,
}

