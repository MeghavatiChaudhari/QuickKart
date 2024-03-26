// import { createAppSlice } from "../../app/createAppSlice"
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { fetchAllProducts , fetchProductsByFilters , fetchBrands,fetchCategories,fetchProductsById} from "./ProductAPI"
// import { configureStore } from '@reduxjs/toolkit';
const initialState = {
  products:[],
  brands:[],
  categories:[],
  status: "idle",
  totalItems:0,
  selectedProduct:null
}

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async()=>{
    const response = await fetchAllProducts();
    return response.data;
  }
)

export const fetchAllProductByIdAsync = createAsyncThunk(
  'product/fetchAllProductById',
  async(id)=>{
    console.log(id+"slice")
    const response = await fetchProductsById(id);
    return response.data;
  }
)




export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async({filter,sort,pagination})=>{
    const response = await fetchProductsByFilters(filter,sort,pagination);
    return response.data;
  }
);

export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async()=>{
    const response = await fetchBrands();
    return response.data;
  }
)
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async()=>{
    const response = await fetchCategories();
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
      state.products=action.payload.products;
      state.totalItems=action.payload.totalItems;
      // state.products = action.payload.products;
      //   state.totalItems = action.payload.totalItems;
     })
     .addCase(fetchBrandsAsync.pending,(state)=>{
      state.status='loading';
     })
     .addCase(fetchBrandsAsync.fulfilled,(state,action)=>{
      state.status='idle',
      state.brands=action.payload;
     })
     .addCase(fetchCategoriesAsync.pending,(state)=>{
      state.status='loading';
     })
     .addCase(fetchCategoriesAsync.fulfilled,(state,action)=>{
      state.status='idle',
      state.categories=action.payload;
     })
     .addCase(fetchAllProductByIdAsync.pending,(state)=>{
      state.status='loading';
     })
     .addCase(fetchAllProductByIdAsync.fulfilled,(state,action)=>{
      state.status='idle',
      state.selectedProduct=action.payload;
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
export const selectBrands = (state)=> state.product.brands;
export const selectCategories = (state)=> state.product.categories;
export const selectProductById = (state)=> state.product.selectedProduct;



export const selectTotalItems = (state)=> state.product.totalItems;
export default productSlice.reducer;
