import { combineSlices, configureStore } from "@reduxjs/toolkit"
import productReducer from '../features/product/ProductSlice';
import authSlice from '../features/auth/authSlice'
// import cartReducer from '../features/cart/cartSlice';
import cartReducer from '../features/cart/cartSlice'
// const rootReducer = combineSlices(counterSlice, quotesApiSlice)

export const store = configureStore({
  reducer:{
    product:productReducer,
    user:authSlice.reducer,
    cart: cartReducer
  }
});

