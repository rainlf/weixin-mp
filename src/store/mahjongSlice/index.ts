import {createSlice} from '@reduxjs/toolkit'

import UserTag = App.MahjongUserTag;
import MahjongLog = App.MahjongLog;

const initialState: {
  playerIds: number[]
  userTags: UserTag[]
  logs: MahjongLog[]
} = {
  playerIds: [],
  userTags: [],
  logs: [],
}

export const mahjongSlice = createSlice({
  name: 'mahjong',
  initialState,
  reducers: {
    setPlayerIds: (state, action) => {
      state.playerIds = action.payload
    },
    setUserTags: (state, action) => {
      state.userTags = action.payload
    },
    setLogs: (state, action) => {
      state.logs = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setPlayerIds,
  setUserTags,
  setLogs,
} = mahjongSlice.actions

export default mahjongSlice.reducer
