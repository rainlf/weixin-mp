import UserInfo = App.UserInfo;
import {createSlice} from '@reduxjs/toolkit'

const initialState: {
  token: string,
  user?: UserInfo,
  userList: UserInfo[],
} = {
  token: '',
  user: undefined,
  userList: [],
}

export const currentUserClice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload
      }
    },
    setUserList: (state, action) => {
      state.userList = action.payload
    },
  }
})
// 每个 case reducer 函数会生成对应的 Action creators
export const {
  setToken,
  setUser,
  setUserList,
} = currentUserClice.actions

export default currentUserClice.reducer
