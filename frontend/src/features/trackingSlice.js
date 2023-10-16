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
  "income/add",
  async (post, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(budgetCollectionRef);
      var result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      var update = false;
      var userDoc;
      result = result.filter((expense) => expense.uid == uid);
      for (const document in result) {
        if (document.category == category) {
          userDoc = doc(firestore, "budget", document.id);
          update = true;
        }
      }
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

const initialState = {
  addStatus: "idle",
  getStatus: "idle",
  updateStatus: "idle",
  income: [],
  budget: [],
  startDate: "",
  endDate: "",
  error: "",
  firstLoad: false,
};

export const trackingSlice = createSlice({
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
      });
  },
});

export const { reset } = trackingSlice.actions;
export default trackingSlice.reducer;
