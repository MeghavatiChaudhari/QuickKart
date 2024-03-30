import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { addToCart,fetchItemByUserId, updateCart,deleteItemFromCart } from "./cartAPI"

const initialState = {
  status: 'idle',
   items:[]
}
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async(item)=>{
    const response = await addToCart(item);
    return response.data;
  }
)


export const fetchItemByUserIdAsync = createAsyncThunk(
  'cart/fetchItemByUserId',
  async(userId)=>{
    const response = await fetchItemByUserId(userId);
    return response.data;
  }
)
export const updateItemAsync = createAsyncThunk(
  'cart/updateItem',
  async(update)=>{
    const response = await updateCart(update);
    return response.data;
  }
)

export const deleteItemFromCartAsync = createAsyncThunk(
  'cart/deleteItemFromCart',
  async(itemId)=>{
    console.log(itemId)
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
)
// If you are not using async thunks you can use the standalone `createSlice`.
export const cartSlice = createAppSlice({
  name: "cart",
  initialState,
  reducers: create => ({
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
    .addCase(addToCartAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(addToCartAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.items.push(action.payload);
    })
    .addCase(fetchItemByUserIdAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(fetchItemByUserIdAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.items=action.payload;
    })
    .addCase(updateItemAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(updateItemAsync.fulfilled,(state,action)=>{
      state.status='idle';
      const index=state.items.findIndex(item=>item.id===action.payload.id)
      state.items[index]=action.payload;
    })
    .addCase(deleteItemFromCartAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(deleteItemFromCartAsync.fulfilled,(state,action)=>{
      state.status='idle';
      const index=state.items.findIndex(item=>item.id===action.payload.id)
      state.items.splice(index,1);
    })
   }




  
  // selectors: {
  //   selectCount: counter => counter.value,
  //   selectStatus: counter => counter.status,
  // },
})



// export const {  increment, incrementAsync } = counterSlice.actions
 export const selectItems = (state)=>{
  if(state.cart && state.cart.items){
    return state.cart.items;
  }else{
    return[];
  }
 };


// export const { selectCount, selectStatus } = counterSlice.selectors

export default cartSlice.reducer;
