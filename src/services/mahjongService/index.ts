import api from '../api'
import store from "../../store";
import {setPlayerIds} from "../../store/mahjongSlice";
import MahjongRecordInfo = App.MahjongRecordInfo;

const getPlayUserIdList = async () => {
  const playUserIdList = await api.sendGet(`/api/mahjong/palyer/ids`)
  store.dispatch(setPlayerIds(playUserIdList))
}

const addPalyUser = (id: number) => {
  api.sendPost(`/api/mahjong/palyer?id=${id}`, null)
}

const deletePlayUser = (id: number) => {
  api.sendDelete(`/api/mahjong/palyer?id=${id}`, null)
}

const saveRecord = (record: MahjongRecordInfo) => {
  api.sendPost(`/api/mahjong/reocrd`, record)
}

// const getRecords = async (pageNumber: number, pageSize: number): Promise<MahjongRecordInfo[]> => {
//   // const re = api.sendGet(`/api/mahjong/records?pageNumber=${pageNumber}&pageSize=${pageSize}`)
// }

export default {
  getPlayUserIdList,
  addPalyUser,
  deletePlayUser,
  saveRecord,
  // getRecords,
}

