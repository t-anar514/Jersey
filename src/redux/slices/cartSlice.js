import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY = 10; // Maximum quantity per product

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    totalQuantity: 0
  },
  reducers: {
    // Add product to cart
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.items.find(
        (item) => item.productID === product.productID
      );
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
          state.totalAmount += product.productPrice;
          state.totalQuantity += 1;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.totalAmount += product.productPrice;
        state.totalQuantity += 1;
      }
    },
    
    // Remove product from cart
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find(item => item.productID === id);
      
      if (existingItem) {
        state.totalAmount -= existingItem.productPrice * existingItem.quantity;
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.productID !== id);
      }
    },
    
    // Increment quantity
    incrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.productID === id);
      if (item && item.quantity < MAX_QUANTITY) {
        item.quantity++;
        state.totalAmount += item.productPrice;
        state.totalQuantity += 1;
      }
    },
    
    // Decrement quantity
    decrementQuantity(state, action) {
      const id = action.payload;
      const item = state.items.find(item => item.productID === id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalAmount -= item.productPrice;
        state.totalQuantity -= 1;
      }
    },
    
    // Clear cart
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    }
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  incrementQuantity, 
  decrementQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
