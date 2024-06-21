import {configureStore} from '@reduxjs/toolkit'
import counter from './counterSlice'
import token from './tokenSlice'
import currentUser from './currentUserSlice'

export default configureStore({
  reducer: {
    counter,
    token,
    currentUser,
  }
})
