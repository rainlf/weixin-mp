import {createSlice} from '@reduxjs/toolkit'

const initialState: {
  playerIds: number[]
} = {
  playerIds: [],
}

export const mahjongSlice = createSlice({
  name: 'mahjong',
  initialState,
  reducers: {
    setPlayerIds: (state, action) => {
      state.playerIds = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setPlayerIds
} = mahjongSlice.actions

export default mahjongSlice.reducer
