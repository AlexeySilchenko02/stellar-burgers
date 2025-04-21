import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type TFeedsData = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

export type TFeedsState = TFeedsData & {
  isLoading: boolean;
  error: string | null;
};

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

const initialState: TFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

/* -------------------------------------------------------------------------- */
/*                                   Thunk                                    */
/* -------------------------------------------------------------------------- */

export const fetchFeeds = createAsyncThunk<
  TFeedsData,
  void,
  { rejectValue: string }
>('feeds/fetchFeeds', async (_, { rejectWithValue }) => {
  try {
    const { orders, total, totalToday } = await getFeedsApi();
    return { orders, total, totalToday };
  } catch (err: any) {
    return rejectWithValue(
      err?.message || 'Не удалось загрузить ленту заказов'
    );
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {
    /** Полный сброс ленты (если нужно, например, при logout) */
    clearFeeds(state) {
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsData>) => {
          state.isLoading = false;
          state.orders = action.payload.orders;
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

// export const { clearFeeds } = feedsSlice.actions;
export default feedsSlice.reducer;
