import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService, getTransactions } from '@utils';
import { IsTransaction, MiscState, OrderPayload } from '@types';
import {
  getAirtimeBills,
  getAllBills,
  getBillCategories,
  getBundleBills,
  getCableBills,
  getFuelBills,
  getPinBills,
  getPowerBills,
} from './bill-slice';
import { DarkMode, LightMode } from '@common';
import { getWallet } from './user-slice';

export const accountSetUp = (userPhone: string) => (dispatch: any) => {
  dispatch(getWallet(userPhone));
  dispatch(getAllTransactions());
  dispatch(getBillCategories());
  // dispatch(getAllBills());
  dispatch(getFuelBills());
  dispatch(getAirtimeBills());
  dispatch(getBundleBills());
  dispatch(getCableBills());
  dispatch(getPowerBills());
  dispatch(getPinBills());
};

export const getAllTransactions = createAsyncThunk(
  'misc/transactions',
  async () => {
    const data = await apiService(getTransactions, 'get');
    console.log('getAllTransactions!!!!!!!!!!!', data);
    return data;
  },
);

const initialState = {
  theme: 'light',
  colors: DarkMode,
  showBalance: true,
  order: undefined,
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
    toggleShowBalance: (state, { payload }) => {
      state.showBalance = payload;
    },
    newOrder: (state, action: PayloadAction<OrderPayload>) => {
      state.order = action.payload;
    },
    updateOrder: (state, { payload }) => {
      state.order = { ...state.order, ...payload };
    },
    // clearOrder: state => {
    //   state.order = undefined;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getAllTransactions.fulfilled,
        (state, action: PayloadAction<IsTransaction[]>) => {
          state.transactions = action.payload.reverse();
        },
      )
      .addCase('user/userLogout', () => {
        return initialState;
      });
  },
});
export const {
  updateTheme,
  toggleShowBalance,
  newOrder,
  updateOrder,
  // clearOrder,
} = miscSlice.actions;

export default miscSlice.reducer;
