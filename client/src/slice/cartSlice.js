import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item._id === newItem._id);
      const quantity = newItem.quantity || 1;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          ...newItem,
          quantity,
        });
      }

      state.totalAmount += newItem.price * quantity;
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item._id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalAmount -= existingItem.price;
        } else {
          state.totalAmount -= existingItem.price;
          state.items = state.items.filter(item => item._id !== id);
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
