import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiService } from '@utils';
import { MiscState } from '@types';
import { getAllBills, getBillCategories } from './bill-slice';

export const accountSetUp = () => (dispatch: any) => {
  dispatch(getBillCategories());
  dispatch(getAllBills());
};

const initialState = {
  theme: 'dark',
} as MiscState;

export const miscSlice = createSlice({
  name: 'misc',
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.theme = payload;
    },
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(
  //         getBillCategories.fulfilled,
  //         (state, action: PayloadAction<IsBillCategory[]>) => {
  //           state.categories = action.payload;
  //         },
  //       )
  //       .addCase(getAllBills.fulfilled, (state, { payload }) => {
  //         state.airtime = payload.filter(
  //           (data: IsBillProvider) => data.billCategoryId === 1,
  //         );
  //         state.bundle = payload.filter(
  //           (data: IsBillProvider) => data.billCategoryId === 5,
  //         );
  //       });
  //   },
});
export const { setTheme } = miscSlice.actions;

export default miscSlice.reducer;
