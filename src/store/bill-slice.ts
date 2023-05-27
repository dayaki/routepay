import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService, getBills, getBillsCategory } from '@utils';
import { BillState, IsBillCategory, IsBillProvider } from '@types';

export const getBillCategories = createAsyncThunk(
  'bills/categories',
  async () => {
    const data = await apiService(getBillsCategory, 'get');
    console.log('getBillCategories', data);
    return data;
  },
);

export const getAllBills = createAsyncThunk('bills/bills', async () => {
  const data = await apiService(getBills, 'get');
  console.log('getAllBills', data);
  return data;
});

const initialState = {
  categories: undefined,
  airtime: undefined,
  bundle: undefined,
  power: undefined,
} as BillState;

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    updateCategories: (state, { payload }) => {
      state.categories = payload;
    },
    updateRefills: (state, { payload }) => {
      state.airtime = payload.filter(
        (data: IsBillProvider) => data.billCategoryId === 1,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(
        getBillCategories.fulfilled,
        (state, action: PayloadAction<IsBillCategory[]>) => {
          state.categories = action.payload;
        },
      )
      .addCase(getAllBills.fulfilled, (state, { payload }) => {
        state.airtime = payload.filter(
          (data: IsBillProvider) => data.billCategoryId === 1,
        );
        state.bundle = payload.filter(
          (data: IsBillProvider) => data.billCategoryId === 5,
        );
      })
      .addCase('user/userLogout', () => {
        return initialState;
      });
  },
});
export const { updateCategories, updateRefills } = billSlice.actions;

export default billSlice.reducer;
