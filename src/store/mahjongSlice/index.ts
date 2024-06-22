import {createSlice} from '@reduxjs/toolkit'

export const mahjongSlice = createSlice({
  name: 'mahjong',
  initialState: {
    playerIds: '',
  },
  reducers: {
    setPlayerIds: (state, action) => {
      state.playerIds  = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setPlayerIds
} = mahjongSlice.actions

export default mahjongSlice.reducer
