import {createSlice} from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    setToken: (state, action) => {
      state.value = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setToken
} = tokenSlice.actions

export default tokenSlice.reducer
