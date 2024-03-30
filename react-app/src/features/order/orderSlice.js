import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { createOrder, fetchCount } from "./orderAPI"

const initialState = {
  orders:[],
  status: "idle",
}


export const createOrderAsync=createAsyncThunk(
  'order/createOrder',
  async(order)=>{
    const response = await createOrder(order);
    return response.data;
  }
)
// If you are not using async thunks you can use the standalone `createSlice`.
export const orderSlice = createAppSlice({
  name: "order",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    
    
  //   incrementAsync: create.asyncThunk(
  //     async amount => {
  //       const response = await fetchCount(amount)
  //       return response.data
  //     },
  //     {
  //       pending: state => {
  //         state.status = "loading"
  //       },
  //       fulfilled: (state, action) => {
  //         state.status = "idle"
  //         state.value += action.payload
  //       },
  //       rejected: state => {
  //         state.status = "failed"
  //       },
  //     },
  //   ),

  extraReducers:(builder)=>{
    builder
    .addCase(createOrderAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(createOrderAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.orders.push(action.payload);
    })
  }
   }),
  
  // selectors: {
  //   selectCount: counter => counter.value,
  //   selectStatus: counter => counter.status,
  // },
})



// export const {  increment, incrementAsync } = counterSlice.actions

// export const { selectCount, selectStatus } = counterSlice.selectors

export default orderSlice;
