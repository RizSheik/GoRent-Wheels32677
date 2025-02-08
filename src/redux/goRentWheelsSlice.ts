import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CarData } from "../../types";

interface InitialState {
  cart: CarData[];
  favorite: CarData[];
  userInfo: UserInfo | null;
}

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

const initialState: InitialState = {
  cart: [],
  favorite: [],
  userInfo: null,
};

export const goRentWheelsSlice = createSlice({
  name: "goRentWheels",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CarData>) => {
      const existingCar = state.cart.find((item) => item._id === action.payload._id);
      if (existingCar) {
        existingCar.quantity = (existingCar.quantity || 1) + 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },

    resetCart: (state) => {
      state.cart = [];
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const car = state.cart.find((item) => item._id === action.payload);
      if (car) car.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const car = state.cart.find((item) => item._id === action.payload);
      if (car && car.quantity > 1) {
        car.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, resetCart, increaseQuantity, decreaseQuantity } = goRentWheelsSlice.actions;
export default goRentWheelsSlice.reducer;