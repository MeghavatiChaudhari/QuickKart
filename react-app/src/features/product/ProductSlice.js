// import { createAppSlice } from "../../app/createAppSlice"
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchAllProducts , fetchProductsByFilters , fetchProductsByFilterssort} from "./ProductAPI"
// import { configureStore } from '@reduxjs/toolkit';
const initialState = {
  products:[],
  status: "idle",
}

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async()=>{
    const response = await fetchAllProducts();
    return response.data;
  }
)

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async({filter,sort})=>{
    const response = await fetchProductsByFilters(filter,sort);
    return response.data;
  }
)

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers:
   create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    
    
    // incrementAsync: create.asyncThunk(
    //   async amount => {
    //     const response = await fetchCount(amount)
    //     return response.data
    //   },
    //   {
    //     pending: state => {
    //       state.status = "loading"
    //     },
    //     fulfilled: (state, action) => {
    //       state.status = "idle"
    //       state.value += action.payload
    //     },
    //     rejected: state => {
    //       state.status = "failed"
    //     },
    //   },
    // ),
  }),
  extraReducers:(builder)=>{
     builder
     .addCase(fetchAllProductsAsync.pending,(state)=>{
      state.status='loading';
     })
     .addCase(fetchAllProductsAsync.fulfilled,(state,action)=>{
      state.status='idle',
      state.products=action.payload;
     })
     .addCase(fetchProductsByFiltersAsync.pending,(state)=>{
      state.status='loading';
     })
     .addCase(fetchProductsByFiltersAsync.fulfilled,(state,action)=>{
      state.status='idle',
      state.products=action.payload;
     })
  },
  selectors: {
    selectCount: counter => counter.value,
    selectStatus: counter => counter.status,
  },
})



// export const {  increment, incrementAsync } = counterSlice.actions

// export const { selectCount, selectStatus } = counterSlice.selectors

export const selectAllProducts = (state)=> state.product.products;
export default productSlice.reducer;
