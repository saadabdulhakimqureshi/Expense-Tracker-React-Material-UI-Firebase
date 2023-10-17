import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

// Firebase
import { firestore } from "../firebase";
import { auth } from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const expensesCollectionRef = collection(firestore, "expenses");

// Firebase calls
export const addExpense = createAsyncThunk(
  "expenses/add",
  async (post, { getState, dispatch }) => {
    try {
      const result = await addDoc(expensesCollectionRef, post);
      dispatch(getExpenses(post.uid));
      return result;
    } catch (e) {
      console.log(e.message);
      throw e.message;
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/update",
  async (payload, { getState, dispatch }) => {
    try {
      const id = payload.id;
      const newFields = payload.newFields;
      const expense = doc(firestore, "expenses", id);
      await updateDoc(expense, newFields);
      dispatch(getExpenses(newFields.uid));
    } catch (e) {
      console.log(e.message);
      throw e.message;
    }
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/delete",
  async (payload, { getState, dispatch }) => {
    try {
      const id = payload.id;
      const expense = doc(firestore, "expenses", id);
      await deleteDoc(expense);
      dispatch(getExpenses(payload.uid));
    } catch (e) {
      console.log(e.message);
      throw e.message;
    }
  }
);

export const getExpenses = createAsyncThunk(
  "expenses/fetch",
  async (uid, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(expensesCollectionRef);

      const result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const filteredExpenses = result.filter((expense) => expense.uid == uid);

      // Sort expenses by date
      const sortedExpenses = filteredExpenses.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });

      // Get the earliest and latest dates
      const earliestDate =
        sortedExpenses.length > 0
          ? sortedExpenses[sortedExpenses.length - 1].date
          : "";
      const latestDate =
        sortedExpenses.length > 0 ? sortedExpenses[0].date : "";

      // Dispatch an action to update the state with the earliest and latest dates
      const { setStartDate, setEndDate } = expensesSlice.actions;
      dispatch(setStartDate(earliestDate));
      dispatch(setEndDate(latestDate));

      return sortedExpenses;
    } catch (e) {
      console.log(e.message);
      throw e.message;
    }
  }
);

const initialState = {
  addStatus: "idle",
  getStatus: "idle",
  updateStatus: "idle",
  unfilteredList: [],
  filteredList: [],
  startDate: "",
  endDate: "",
  error: "",
  filters: ["Entertainment, Transportation, Utilities, Food, Other"],
  firstLoad: false,
};

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.getStatus = "idle";
      state.addStatus = "idle";
      state.updateStatus = "idle";
      state.firstLoad = false;
    },
    getUnfilteredExpenses: (state, action) => {
      state.filteredList = state.unfilteredList;
      const sortedExpenses = state.filteredList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });

      state.filteredList = sortedExpenses;

      const startDate = new Date(state.startDate);
      const endDate = new Date(state.endDate);
      // Filter expenses based on the date range
      const filteredExpenses = state.filteredList.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return startDate <= expenseDate && expenseDate <= endDate;
      });

      // Update the state with the filtered expenses
      state.filteredList = filteredExpenses;
    },
    filterExpenses: (state, action) => {
      state.filteredList = [];
      const filteredData = action.payload.filters.map((filter) => {
        return state.unfilteredList.filter((element) => {
          return element.category === filter;
        });
      });

      var sortedExpenses = [].concat(...filteredData); // Merge arrays using concat

      sortedExpenses = sortedExpenses.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateB - dateA;
      });

      const startDate = new Date(state.startDate);
      const endDate = new Date(state.endDate);
      // Filter expenses based on the date range
      const filteredExpenses = sortedExpenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return startDate <= expenseDate && expenseDate <= endDate;
      });

      // Update the state with the filtered expenses
      state.filteredList = filteredExpenses;
    },
    filterExpensesByDate: (state, action) => {},
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setFirstLoad: (state, action) => {
      state.firstLoad = true;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addExpense.pending, (state, action) => {
        state.addStatus = "loading";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.addStatus = "succeded";
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.addStatus = "failed";
        state.error = "Could not add expense, try again later!";
      })
      .addCase(getExpenses.pending, (state, action) => {
        state.getStatus = "loading";
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.getStatus = "succeded";
        state.unfilteredList = action.payload;
        state.filteredList = state.unfilteredList;
      })
      .addCase(getExpenses.rejected, (state, action) => {
        state.getStatus = "failed";
        state.error = "Could not get expense, try again later!";
      })
      .addCase(updateExpense.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.updateStatus = "succeded";
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = "Could not update expense, try again later!";
      })
      .addCase(deleteExpense.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.updateStatus = "succeded";
      })
      .addCase(deleteExpense.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = "Could not update expense, try again later!";
      });
  },
});

export const {
  reset,
  filterExpenses,
  filterExpensesByDate,
  setFirstLoad,
  setStartDate,
  setEndDate,
  getUnfilteredExpenses,
} = expensesSlice.actions;
export default expensesSlice.reducer;
