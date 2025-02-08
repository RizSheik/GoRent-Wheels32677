import { configureStore } from "@reduxjs/toolkit";
import goRentWheelsReducer from "./goRentWheelsSlice";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ Use default local storage for persistence

// ✅ Redux Persist Configuration
const persistConfig = {
  key: "goRentWheels",
  storage,
};

const persistedReducer = persistReducer(persistConfig, goRentWheelsReducer);

export const store = configureStore({
  reducer: {
    goRentWheels: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ No need to ignore individual actions
    }),
});

export const persistor = persistStore(store);

// ✅ Type Definitions
export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch;
