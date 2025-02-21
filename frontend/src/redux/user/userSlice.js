import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Creating the userSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Start loading
    signInStart(state) {
      state.loading = true;
    },
    // Set user info after successful sign-in
    signInSuccess(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    // Handle sign-in failure
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Handle user sign-out
    signOut(state) {
      state.user = null;
      state.error = null;
    },
  },
});

// Export actions to dispatch
export const { signInStart, signInSuccess, signInFailure, signOut } =
  userSlice.actions;

// Export the reducer to configure store
export default userSlice.reducer;
