import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import expensesReducer from "../features/expensesSlice.js"
export const store = configureStore({
  reducer: {
    auth : authReducer,
    expenses : expensesReducer,
  },
});
