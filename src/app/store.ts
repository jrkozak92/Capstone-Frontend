import { configureStore } from '@reduxjs/toolkit'
import hobbyReducer from '../features/hobby/hobbySlice'

const store = configureStore({
  reducer: {
    hobby: hobbyReducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;
