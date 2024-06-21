import UserInfo = App.UserInfo;
import {createSlice} from '@reduxjs/toolkit'


export const currentUserClice = createSlice({
  name: 'token',
  initialState: {
    value: {} as UserInfo
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.value = {
        ...state.value,
        ...action.payload
      }
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setCurrentUser
} = currentUserClice.actions

export default currentUserClice.reducer
