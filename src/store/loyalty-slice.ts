import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiService, formatPhone } from '@utils';
import { LoyaltyState } from '@types';

export const loyaltySetUp = (phone: string) => (dispatch: any) => {
  //   const userPhone = formatPhone(phone);
  dispatch(getLoyaltyData(phone));
};

export const getLoyaltyData = createAsyncThunk(
  'loyalty/all',
  async (phone: string) => {
    const data = await apiService(
      `https://myzuby.com/PromoXchangeFin/PromoService?receiver=50811&msgdata=promo profile&sender=${formatPhone(
        phone,
      )}&engineID=234102`,
      'get',
    );
    console.log('getLoyaltyData', data);
    return data;
  },
);

export const getOverallData = createAsyncThunk(
  'loyalty/overall',
  async (phone: string) => {
    const data = await apiService(
      `https://myzuby.com/PromoXFetcher/FetchingServiceFin?msisdn=${formatPhone(
        phone,
      )}&op_key=24&engineID=234102`,
      'get',
    );
    console.log('getOverallData', data);
    return data;
  },
);

export const getMonthlyData = createAsyncThunk(
  'loyalty/monthly',
  async (phone: string) => {
    const data = await apiService(
      `https://myzuby.com/PromoXFetcher/FetchingServiceFin?msisdn=${formatPhone(
        phone,
      )}&op_key=23&engineID=234102`,
      'get',
    );
    console.log('getMonthlyData', data);
    return data;
  },
);

export const getWinnings = createAsyncThunk(
  'loyalty/winnings',
  async (phone: string) => {
    const data = await apiService(
      `https://myzuby.com/PromoXFetcher/FetchingServiceFin?msisdn=${formatPhone(
        phone,
      )}&op_key=27&engineID=234102`,
      'get',
    );
    console.log('getLoyaltyData', data);
    return data;
  },
);

const initialState = {
  dashboard: undefined,
  overall: undefined,
  monthly: undefined,
  winnings: undefined,
} as LoyaltyState;

export const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    // updateCategories: (state, { payload }) => {
    //   state.categories = payload;
    // },
    // updateRefills: (state, { payload }) => {
    //   state.airtime = payload.filter(
    //     (data: IsBillProvider) => data.billCategoryId === 1,
    //   );
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getLoyaltyData.fulfilled, (state, { payload }) => {
        state.dashboard = payload;
      })
      .addCase(getOverallData.fulfilled, (state, { payload }) => {
        state.overall = payload;
      })
      .addCase(getMonthlyData.fulfilled, (state, { payload }) => {
        state.monthly = payload;
      })
      .addCase(getWinnings.fulfilled, (state, { payload }) => {
        state.winnings = payload;
      })
      .addCase('user/userLogout', () => {
        return initialState;
      });
  },
});
// export const { updateCategories, updateRefills } = loyaltySlice.actions;

export default loyaltySlice.reducer;
