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

const incomeCollectionRef = collection(firestore, "income");

// Firebase calls
export const updateincome = createAsyncThunk(
  "incomes/add",
  async (post, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(incomeCollectionRef);
      var result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      var update = false;
      var userDoc;

      result = result.filter(
        (income) => income.uid == post.uid && income.month == post.month
      );
      if (result.length > 0) {
        var document = result[0];
        userDoc = doc(firestore, "income", document.id);
        update = true;
      }

      if (update == false) {
        result = await addDoc(incomeCollectionRef, post);
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

export const getincomes = createAsyncThunk(
  "incomes/get",
  async (uid, { getState, dispatch }) => {
    try {
      const snapShot = await getDocs(incomeCollectionRef);
      var result = snapShot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const year = new Date().getFullYear();
      console.log(year);
      result = result.filter((income) => {
        {
          console.log(income.year);
          return income.uid == uid && income.year === year;
        }
      });

      console.log(result);
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
  startDate: "",
  endDate: "",
  error: "",
  firstLoad: false,
};

export const incomeSlice = createSlice({
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
      .addCase(updateincome.pending, (state, action) => {
        state.updateStatus = "loading";
      })
      .addCase(updateincome.fulfilled, (state, action) => {
        state.updateStatus = "succeded";
      })
      .addCase(updateincome.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = "Could not add expense, try again later!";
      })
      .addCase(getincomes.pending, (state, action) => {
        state.getStatus = "loading";
      })
      .addCase(getincomes.fulfilled, (state, action) => {
        state.getStatus = "succeded";
        state.incomes = action.payload;
      })
      .addCase(getincomes.rejected, (state, action) => {
        state.getStatus = "failed";
        state.error = "Could not get incomes, try again later!";
      });
  },
});

export const { reset } = incomeSlice.actions;
export default incomeSlice.reducer;
