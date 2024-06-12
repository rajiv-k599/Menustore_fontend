import { createSlice } from "@reduxjs/toolkit";
import { CartItemModel, ShoppingCartModel } from "../../interface";

const initialState: ShoppingCartModel = {
  cartItems: [],
};
export const shoppingCartSlice = createSlice({
  name: "cartItem",
  initialState: initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateQuantity: (state, action) => {
      state.cartItems = state.cartItems?.map((item) => {
        if (item.id === action.payload.cartItem.id) {
          item.quantity = action.payload.quantity;
        }

        return item;
      });
    },
    removeFromCart: (state, action) => {
      console.log(action);
      state.cartItems = state.cartItems?.filter((item) => {
        if (item.id === action.payload.cartItem.id) {
          return null;
        }
        return item;
      });
    },
  },
});

export const { setShoppingCart, updateQuantity, removeFromCart } =
  shoppingCartSlice.actions;
export const cartItemReducer = shoppingCartSlice.reducer;
