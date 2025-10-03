import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './feature/cart/cartSlice.js'

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
}) 