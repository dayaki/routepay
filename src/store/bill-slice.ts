import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  apiService,
  billsApi,
  getBillsByCategory,
  getBillsCategory,
  postBundleLookup,
} from '@utils';
import { BillState, IsBillCategory, IsBillProvider } from '@types';
import axios from 'axios';
import { store } from './store';

export const getBillCategories = createAsyncThunk(
  'bills/categories',
  async () => {
    const data = await apiService(getBillsCategory, 'get');
    console.log('getBillCategories', data);
    return data;
  },
);

export const getAllBillsByCategories = createAsyncThunk(
  'bills/by-categories',
  async (categoryId: number) => {
    const data = await apiService(getBillsByCategory(categoryId), 'get');
    // console.log('getBillCategories', data);
    return data;
  },
);

// export const getAllBills = createAsyncThunk('bills/bills', async () => {
//   try {
//     const { data } = await axios.get(
//       `${billsApi}/bill',
//      `{
//         headers: { Authorization: `Bearer ${store.getState().user.token}` },
//       },
//     );
//     return data;
//   } catch (error) {
//     console.log('getAllBills ERR', error);
//   }
// });

export const getAirtimeBills = createAsyncThunk('bills/airtime', async () => {
  try {
    const { data } = await axios.get(`${billsApi}/bill/1/category`, {
      headers: { Authorization: `Bearer ${store.getState().user.token}` },
    });
    return data;
  } catch (error) {
    console.log('getAirtimeBills ERR', error);
  }
});

export const getCableBills = createAsyncThunk('bills/cable', async () => {
  try {
    const { data } = await axios.get(`${billsApi}/bill/2/category`, {
      headers: { Authorization: `Bearer ${store.getState().user.token}` },
    });
    return data;
  } catch (error) {
    console.log('getAirtimeBills ERR', error);
  }
});

export const getPowerBills = createAsyncThunk('bills/power', async () => {
  try {
    const { data } = await axios.get(`${billsApi}/bill/3/category`, {
      headers: { Authorization: `Bearer ${store.getState().user.token}` },
    });
    return data;
  } catch (error) {
    console.log('getAirtimeBills ERR', error);
  }
});

export const getPinBills = createAsyncThunk('bills/pin', async () => {
  try {
    const { data } = await axios.get(`${billsApi}/bill/4/category`, {
      headers: { Authorization: `Bearer ${store.getState().user.token}` },
    });
    return data;
  } catch (error) {
    console.log('getAirtimeBills ERR', error);
  }
});

export const getBundleBills = createAsyncThunk('bills/bundles', async () => {
  try {
    const { data } = await axios.get(`${billsApi}/bill/5/category`, {
      headers: { Authorization: `Bearer ${store.getState().user.token}` },
    });
    return data;
  } catch (error) {
    console.log('getAirtimeBills ERR', error);
  }
});

export const getFuelBills = createAsyncThunk('bills/fuel', async () => {
  try {
    const { data } = await axios.post(
      postBundleLookup,
      {
        billCode: 'FUEL',
        payload: {},
      },
      {
        headers: { Authorization: `Bearer ${store.getState().user.token}` },
      },
    );
    return data.response;
  } catch (error) {
    console.log('getFuelBills ERR', error);
  }
});

const initialState = {
  categories: undefined,
  airtime: undefined,
  bundle: undefined,
  cable: undefined,
  power: undefined,
  fuel: undefined,
  pins: undefined,
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
      // .addCase(getAllBills.fulfilled, (state, { payload }) => {
      //   console.log('!!!!! getAllBills !!!!!', payload);
      //   state.airtime = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 1,
      //   );
      //   state.cable = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 2,
      //   );
      //   state.power = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 3,
      //   );
      //   state.pins = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 4,
      //   );
      //   state.bundle = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 5,
      //   );
      //   state.fuel = payload.filter(
      //     (data: IsBillProvider) => data.billCategoryId === 6,
      //   );
      // })
      .addCase(getBundleBills.fulfilled, (state, { payload }) => {
        state.bundle = payload;
      })
      .addCase(getAirtimeBills.fulfilled, (state, { payload }) => {
        console.log('!!!!! getAirtimeBills.fulfilled !!!!!', payload);
        state.airtime = payload;
      })
      .addCase(getAirtimeBills.rejected, (state, error) => {
        console.log('getAirtimeBills.rejected', error);
      })
      .addCase(getFuelBills.fulfilled, (state, { payload }) => {
        state.fuel = payload;
      })
      .addCase(getCableBills.fulfilled, (state, { payload }) => {
        state.cable = payload;
      })
      .addCase(getPowerBills.fulfilled, (state, { payload }) => {
        state.power = payload;
      })
      .addCase(getPinBills.fulfilled, (state, { payload }) => {
        state.pins = payload;
      })
      .addCase('user/userLogout', () => {
        return initialState;
      });
  },
});
export const { updateCategories, updateRefills } = billSlice.actions;

export default billSlice.reducer;
