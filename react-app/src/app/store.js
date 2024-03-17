import { combineSlices, configureStore } from "@reduxjs/toolkit"
import productReducer from '../features/product/ProductSlice';


// const rootReducer = combineSlices(counterSlice, quotesApiSlice)

export const store = configureStore({
  reducer:{
    product:productReducer
  }
});

