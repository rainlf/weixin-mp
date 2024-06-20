import api from '../api'
import MahjongRecordInfo = App.MahjongRecordInfo;

const saveRecord = (record: MahjongRecordInfo): Promise<void> => {
  return api.sendPost(`/api/mahjong/reocrd`, record)
}

const getRecords = (pageNumber: number, pageSize: number): Promise<MahjongRecordInfo[]> => {
  return api.sendGet(`/api/mahjong/records?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}

export default {
  saveRecord,
  getRecords,
}

