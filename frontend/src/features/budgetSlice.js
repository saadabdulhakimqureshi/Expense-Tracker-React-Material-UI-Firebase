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

const budgetCollectionRef = collection(firestore, "budget");

// Firebase calls
export const updateBudget = createAsyncThunk(
  "budgets/add",
  async (post, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(budgetCollectionRef);
      var result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      var update = false;
      var userDoc;

      result = result.filter(
        (expense) =>
          expense.uid == post.uid && expense.category == post.category
      );
      if (result.length > 0) {
        var document = result[0];
        userDoc = doc(firestore, "budget", document.id);
        update = true;
      }
      console.log(result);

      if (update == false) {
        result = await addDoc(budgetCollectionRef, post);
      } else {
        await updateDoc(userDoc, post);
      }
      return result;
    } catch (e) {
      console.log(e.message);
      throw e.message;
    }
  }
);

export const getBudgets = createAsyncThunk(
  "budgets/get",
  async (uid, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(budgetCollectionRef);
      var result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      result = result.filter((expense) => expense.uid == uid);

      return result;
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
  incomes: [],
  budgets: [],
  startDate: "",
  endDate: "",
  error: "",
  firstLoad: false,
};

export const budgetSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.getStatus = "idle";
      state.addStatus = "idle";
      state.updateStatus = "idle";
      state.firstLoad = false;
    },
    setFirstLoad: (state, action) => {
      state.firstLoad = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateBudget.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.updateStatus = "succeded";
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = "Could not add expense, try again later!";
      })
      .addCase(getBudgets.pending, (state, action) => {
        state.getStatus = "loading";
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.getStatus = "succeded";
        state.budgets = action.payload;
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.getStatus = "failed";
        state.error = "Could not get budgets, try again later!";
      });
  },
});

export const { reset } = budgetSlice.actions;
export default budgetSlice.reducer;
