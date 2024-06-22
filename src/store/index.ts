import {configureStore} from '@reduxjs/toolkit'
import currentUser from './currentUserSlice'
import mahjong from './mahjongSlice'

export default configureStore({
  reducer: {
    currentUser,
    mahjong,
  }
})
