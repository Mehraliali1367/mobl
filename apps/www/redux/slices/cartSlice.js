"use client";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, qty } = action.payload;
      const totalPriceProduct =
        (product.price * qty) -
        (product.price * (product.discount_percent / 100) * qty);
      state.cart = [...state.cart, { ...product, qty: qty,totalPriceProduct:totalPriceProduct }];
      console.log(state.cart);
      
    },
    removFromCart: (state, action) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
      // console.log(state.cart);
    },
    
  },
});

export const { addToCart, removFromCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
