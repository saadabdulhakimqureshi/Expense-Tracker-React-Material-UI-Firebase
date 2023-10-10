import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updatePhoneNumber,
  updateProfile,
} from "firebase/auth";

import axios from "axios";
import { auth } from "../firebase";

const initialState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { getState, dispatch }) => {
    try {
      console.log(credentials);
      var userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await updateProfile(userCredential.user, credentials);
      return userCredential.user;
    } catch (e) {
      console.log(e.message);
      dispatch(reset());
      throw e.message;
    }
  }
);

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  try {
    console.log(credentials);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    return userCredential.user;
  } catch (e) {
    console.log(e.message);
    dispatch(reset());
    throw e.message;
  }
});

export const updateUser = createAsyncThunk(
  "profile/update",
  async (credentials, { getState, dispatch }) => {
    console.log(credentials);
    const user = getState().auth.currentUser;
    console.log(user);
    try {
      var userCredential;
      if (credentials.displayName != "")
        userCredential = await updateProfile(user, {
          displayName: credentials.displayName,
        });

      if (credentials.email != "") {
        await updateEmail(user, credentials.email);
      }

      if (credentials.password != "") {
        await updatePassword(user, credentials.password);
      }
    } catch (e) {
      console.log(e.message);
      dispatch(reset);
      throw e.message;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
    },
    reset: (state, action) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeded";
        state.currentUser = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Account already registered!";
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeded";
        state.currentUser = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Authentication Failed!";
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeded";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Profile Update Failed!";
      });
  },
});

export const { logout, reset } = authSlice.actions;

export default authSlice.reducer;
