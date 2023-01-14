import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from '@reduxjs/toolkit';


export const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

const addProfile = createAsyncThunk("profile/submitted", async (profile) => {
  const res = await fetch("http://localhost:3001/api/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(profile)
  });
  const createdProfile = await res.json();
  return createdProfile;
});

// Slice
export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: false,
      git: '',
      about: '',
      isFieldDirty: {
        firstName: false,
        email: false,
        git: false,
        uploadedCv: false,
        about: false
      },
      available: {
        firstName: false,
        email: false,
        git: false,
        uploadedCv: false,
        about: false
      }
    },
    serverRes: [],
    error: null,
    loading: false,
  },

  reducers: {
    addProfileData: (state, action) => {
      let payload = action.payload;
      let { available, isFieldDirty, ...rest } = payload;
      available = { ...state.profile.available, ...available };
      isFieldDirty = { ...state.profile.isFieldDirty, ...isFieldDirty };
      state.profile = { ...state.profile, available, isFieldDirty, ...rest }
    },

    [addProfile.pending]: (state, _) => {
      state.error = null;
      state.loading = true;
    },
    [addProfile.fulfilled]: (state, action) => {
      console.log(action);
      state.serverRes.push(action.payload);
      state.loading = false;
    },
    [addProfile.rejected]: (state, action) => {
      console.log(action);
      state.error = action.payload;
      state.loading = false;
    },
    resetStore: (state, action) => {
      state.profile = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: false,
        git: '',
        about: '',
        isFieldDirty: {
          firstName: false,
          email: false,
          location: false,
          git: false,
          uploadedCv: false,
          about: false
        },
        available: {
          firstName: false,
          email: false,
          location: false,
          git: false,
          uploadedCv: false,
          about: false
        }
      }
    }
  }

});
export default profileSlice.reducer;
export const { addProfileData, resetStore } = profileSlice.actions;
export { addProfile };
