import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@utils';
import { UserState } from '@types';

// export const getUserCards = createAsyncThunk('user/cards', async () => {
//   const { data } = await apiService(getCards, 'get');
//   return data;
// });

const initialState = {
  user: undefined,
  token: undefined,
  isAuthenticated: false,
  onboarded: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.isAuthenticated = true;
      state.onboarded = true;
    },
    updateToken: (state, { payload }) => {
      state.token = payload;
      // state.isAuthenticated = true;
      // state.onboarded = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    userLogout: state => {
      state.isAuthenticated = false;
      state.user = undefined;
    },
  },
  // extraReducers: builder => {
  //   builder.addCase(
  //     getUserCards.fulfilled,
  //     (state, action: PayloadAction<isCard>) => {
  //       state.card = action.payload;
  //     },
  //   );
  // },
});
export const { userLogin, updateUser, userLogout, updateToken } =
  userSlice.actions;

export default userSlice.reducer;
