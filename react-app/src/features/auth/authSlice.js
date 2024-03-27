import { createAsyncThunk } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import { createUser,checkUser } from "./authAPI"

const initialState = {
  loggedInUser:null,
  status: "idle",
  error:null,
}

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData)=>{
    const response = await createUser(userData);
    return response.data;
  }
)

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo)=>{
    const response = await checkUser(loginInfo);
    return response.data;
  }
)



// If you are not using async thunks you can use the standalone `createSlice`.
export const authSlice = createAppSlice({
  name: "user",
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
    .addCase(createUserAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(createUserAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.loggedInUser=action.payload;
    })
    .addCase(checkUserAsync.pending,(state)=>{
      state.status='loading';
    })
    .addCase(checkUserAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.loggedInUser=action.payload;
    })
    .addCase(checkUserAsync.rejected,(state,action)=>{
      state.status='idle';
      state.error=action.error;
    })
  }
  
  // selectors: {
  //   selectCount: counter => counter.value,
  //   selectStatus: counter => counter.status,
  // },
})

export const selectLoggedInUser=(state)=>state.user.loggedInUser;
export const selectError =(state)=>state.user.error;
 export default authSlice;
// export const {  increment, incrementAsync } = counterSlice.actions

// export const { selectCount, selectStatus } = counterSlice.selectors


