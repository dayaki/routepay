import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService, getTransactions } from '@utils';
import { IsTransaction, MiscState } from '@types';
import { getAllBills, getBillCategories } from './bill-slice';
import { DarkMode, LightMode } from '@common';
import { getWallet } from './user-slice';

export const accountSetUp = (userId: string) => (dispatch: any) => {
  dispatch(getWallet(userId));
  dispatch(getBillCategories());
  dispatch(getAllBills());
  dispatch(getAllTransactions());
};

export const getAllTransactions = createAsyncThunk('bills/bills', async () => {
  const data = await apiService(getTransactions, 'get');
  return data;
});

const initialState = {
  theme: 'dark',
  colors: DarkMode,
  transactions: undefined,
} as MiscState;

export const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    updateTheme: (state, { payload }) => {
      state.theme = payload;
      state.colors = payload === 'light' ? LightMode : DarkMode;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getAllTransactions.fulfilled,
        (state, action: PayloadAction<IsTransaction[]>) => {
          state.transactions = action.payload;
        },
      )
      .addCase('user/userLogout', () => {
        return initialState;
      });
  },
});
export const { updateTheme } = miscSlice.actions;

export default miscSlice.reducer;
