import api from '../api'
import MahjongRecordInfo = App.MahjongRecordInfo;

export const saveRecord = (record: MahjongRecordInfo): Promise<void> => {
  return api.wx_post(`/api/mahjong/reocrd`, record)
}

export const getRecords = (pageNumber: number, pageSize: number): Promise<MahjongRecordInfo[]> => {
  return api.wx_get(`/api/mahjong/records?pageNumber=${pageNumber}&pageSize=${pageSize}`)
}


