import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

type TOrderInfoState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderInfoState = {
  orders: [],
  isLoading: false,
  error: null
};

/* -------------------------------------------------------------------------- */
/*                                   Thunk                                    */
/* -------------------------------------------------------------------------- */

export const fetchOrderByNumber = createAsyncThunk<
  TOrder[],
  number,
  { rejectValue: string }
>('orderInfo/fetchOrderByNumber', async (number, { rejectWithValue }) => {
  try {
    const res = await getOrderByNumberApi(number);
    return res.orders;
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Не удалось получить заказ');
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {
    clearOrderInfo: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orders = [];
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

// export const { clearOrderInfo } = orderInfoSlice.actions;
export default orderInfoSlice.reducer;
