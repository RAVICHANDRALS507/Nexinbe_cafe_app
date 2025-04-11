// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.find((item) => item.id === action.payload.id);
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity || 1;
//       } else {
//         state.push({ ...action.payload, quantity: action.payload.quantity || 1 });
//       }
//     },
//     removeFromCart: (state, action) => {
//       return state.filter((item) => item.id !== action.payload);
//     },
//     updateQuantity: (state, action) => {  // Ensure this function exists
//       const item = state.find((item) => item.id === action.payload.id);
//       if (item) {
//         item.quantity += action.payload.quantity;
//         if (item.quantity < 1) {
//           return state.filter((item) => item.id !== action.payload.id);
//         }
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions; // Ensure updateQuantity is exported
// export default cartSlice.reducer;



// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: [],
//   reducers: {
//     addToCart: (state, action) => {
//       const itemIndex = state.findIndex(item => item._id === action.payload._id);
//       if (itemIndex === -1) {
//         // If item is not already in the cart, add it
//         state.push(action.payload);
//       } else {
//         // If item is already in the cart, just update the quantity
//         state[itemIndex].quantity += action.payload.quantity;
//       }
//     },
//     removeFromCart: (state, action) => {
//       return state.filter(item => item._id !== action.payload); // Filter out item based on its id
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(item => item._id === newItem._id);

      if (existingItem) {
        // Add only if quantity is valid
        const quantityToAdd = newItem.quantity > 0 ? newItem.quantity : 1;
        existingItem.quantity += quantityToAdd;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: newItem.quantity > 0 ? newItem.quantity : 1,
        });
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== itemId);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
