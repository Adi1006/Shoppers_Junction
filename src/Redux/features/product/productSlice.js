import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
  subtotalValue: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // add: (state, action) => {
    //   //   state.value += 1;
    //   state.value = state.value.concat([action.payload]);
    //   //   console.log(action.payload);
    // },
    add: (state, action) => {
      const item = action.payload;
      const existingItem = state.value.find((p) => p.id === item.id);

      if (existingItem) {
        // If the item already exists in the cart, update its quantity
        existingItem.count += item.count;
        existingItem.subtotal += item.subtotal;
      } else {
        // If the item doesn't exist, add it to the cart
        state.value.push(item);
      }
    },
    productIncrement: (state, action) => {
      const { index, item } = action.payload;
      state.value[index] = { ...item };
    },
    
    clearItem: (state) => {
      state.value = [];
    },
    deleteItem: (state, action) => {
      state.value = state.value.filter((item, index) => {
        return index !== action.payload;
      });
    },
    handleSubtotalMethod: (state) => {
      state.subtotalValue = state.value.reduce((result, item) => {
        return result + item.subtotal;
      }, 0);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  add,
  productIncrement,
  clearItem,
  deleteItem,
  incrementByAmount,
  handleSubtotalMethod,
} = productSlice.actions;

export default productSlice.reducer;
