import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService, getWalletBalance } from '@utils';
import { IsWallet, UserState } from '@types';

export const getWallet = createAsyncThunk(
  'user/wallet',
  async (userId: string) => {
    const data = await apiService(getWalletBalance(userId), 'get');
    return data;
  },
);

const initialState = {
  user: undefined,
  token: undefined,
  username: null,
  email: null,
  wallet: { balance: 0 },
  isAuthenticated: false,
  onboarded: false,
  inactivity: false,
  appState: '',
  logOffTime: '',
  lockAlertVisibility: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, { payload }) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.onboarded = true;
      state.username = payload.firstName;
      state.email = payload.email;
    },
    updateToken: (state, { payload }) => {
      state.token = payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateWalletBalance: (state, { payload }) => {
      state.wallet.balance = state.wallet.balance + Number(payload);
    },
    setappState: (state, { payload }) => {
      state.appState = payload;
    },
    setlogOffTime: (state, { payload }) => {
      state.logOffTime = payload;
    },
    setLockAert: (state, { payload }) => {
      state.lockAlertVisibility = payload;
    },
    userLogout: state => {
      state.isAuthenticated = false;
      state.user = undefined;
      state.lockAlertVisibility = false;
      state.logOffTime = '';
      state.appState = '';
      state.wallet = { ...state.wallet, balance: 0 };
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getWallet.fulfilled,
      (state, action: PayloadAction<IsWallet>) => {
        state.wallet = action.payload;
      },
    );
  },
});
export const {
  userLogin,
  updateUser,
  userLogout,
  updateToken,
  updateWalletBalance,
  setappState,
  setlogOffTime,
  setLockAert,
} = userSlice.actions;

export default userSlice.reducer;
