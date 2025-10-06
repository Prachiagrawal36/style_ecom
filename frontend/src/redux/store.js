import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './feature/cart/cartSlice.js'
import authApi from './feature/auth/authApi.js'
import authReducer from './feature/auth/authSlice.js'
import productsApi from './feature/products/productsApi.js'
import reviewApi from './feature/reviews/reviewsApi.js'

export default configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath] : authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath] : productsApi.reducer,
    [reviewApi.reducerPath] : reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productsApi.middleware, reviewApi.middleware),
}) 