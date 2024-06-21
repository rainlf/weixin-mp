import {configureStore} from '@reduxjs/toolkit'
import counter from './counterSlice'
import token from './tokenSlice'
import currentUser from './currentUserSlice'
import userList from './userListSlice'

export default configureStore({
  reducer: {
    counter,
    token,
    currentUser,
    userList,
  }
})
