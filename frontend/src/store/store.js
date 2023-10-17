import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import expensesReducer from "../features/expensesSlice.js";
import budgetReducer from "../features/budgetSlice.js";
import incomeReducer from "../features/incomeSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    budget: budgetReducer,
    income: incomeReducer,
  },
});
