import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from '../../cartItems'
import axios from 'axios'
import { openModal } from "../modal/modal";
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const state = {
  cartItems:[],
  amount:4,
  total:0,
  isLoading:true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems',async(name,thunkApi)=>{
  try {
    console.log(thunkApi,name)
    console.log(thunkApi.getState());
    // thunkApi.dispatch(openModal())
    const {data} = await axios.get(url);
    return data
  } catch (error) {
    return thunkApi.rejectWithValue('some thing went wrong please try later')
  }
})

const cartSlice = createSlice({
  name:'cart',
  initialState:state,
  reducers:{
    clearCart:(state)=>{
      state.cartItems = []
    },
    removeItem:(state,action)=>{
      const {id} = action.payload;
      state.cartItems = state.cartItems.filter(item=>{
        return id !== item.id;
      })
    },
    toggleAmount:(state,action)=>{
      const {type,id} = action.payload;
      // remember array is a refrence type so cartItem === state.cartItems[his index] === hex value in memory..
      const cartItem = state.cartItems.find(item=>{
        return item.id == id
      })
      if(type === 'increase'){
        cartItem.amount = cartItem.amount +1;
      }
      else{
        cartItem.amount = cartItem.amount -1;
      }
    },
    calculateTotal:(state)=>{
      let amount = 0;
      let total = 0;
      state.cartItems.forEach(item=>{
        amount += item.amount;
        total  += item.amount *item.price;
      })
      state.amount = amount;
      state.total = total;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      })
  },
})

export default cartSlice.reducer
export const {clearCart ,removeItem,toggleAmount,calculateTotal} = cartSlice.actions;

