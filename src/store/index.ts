import { configureStore } from '@reduxjs/toolkit'
import counter from './counterSlice'
import token from './tokenSlice'

export default configureStore({
  reducer: {
    counter,
    token
  }
})
