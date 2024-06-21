import {createSlice} from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    setToken: (state, action) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。它
      // 并不是真正的改变状态值，因为它使用了 Immer 库
      // 可以检测到“草稿状态“ 的变化并且基于这些变化生产全新的
      // 不可变的状态
      state.value = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setToken
} = tokenSlice.actions

export default tokenSlice.reducer
