import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { fetchLoggedInUserOrders } from "./UserAPI"

const initialState = {
  userOrders: [],
  status: "idle",

}

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async(userId)=>{
     const response = await fetchLoggedInUserOrders(userId);
     return response.data;
  }
)




// If you are not using async thunks you can use the standalone `createSlice`.
export const  userSlice= createAppSlice({
  name: "user",
  initialState,
  reducers: create => ({
    increment: create.reducer(state => {
      state.value += 1
    }),
    
    extraReducers:(builder)=>{
      builder
      .addCase(fetchLoggedInUserOrderAsync.pending,(state)=>{
        state.status='loading';
       })
       .addCase(fetchLoggedInUserOrderAsync.fulfilled,(state,action)=>{
        state.status='idle',
        state.userOrders=action.payload; //this info cn be different pr more from loggedinuser info
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
export const selectUserOrders=(state)=>state.user.userOrders;
export  default userSlice.reducer;
