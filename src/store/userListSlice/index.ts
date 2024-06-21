import UserInfo = App.UserInfo;
import {createSlice} from '@reduxjs/toolkit'

export const userListSlice = createSlice({
  name: 'userList',
  initialState: {
    value: [] as UserInfo[]
  },
  reducers: {
    setUserList: (state, action) => {
      state.value = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setUserList
} = userListSlice.actions

export default userListSlice.reducer
