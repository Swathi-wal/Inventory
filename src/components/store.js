import { configureStore } from '@reduxjs/toolkit'
import loginSliceReducer from './slices/LoginSlice'
import ProductSliceReducer from './slices/ProductSlice'
export const store = configureStore({
  reducer: {
    login:loginSliceReducer,
    product:ProductSliceReducer
  },
})