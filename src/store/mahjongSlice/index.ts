import {createSlice} from '@reduxjs/toolkit'

import UserTag = App.UserTag;

const initialState: {
  playerIds: number[]
  userTags: UserTag[]
} = {
  playerIds: [],
  userTags: [],
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
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setPlayerIds,
  setUserTags,
} = mahjongSlice.actions

export default mahjongSlice.reducer
