import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getOrdersApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

type TUserOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TUserOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

/* -------------------------------------------------------------------------- */
/*                                   Thunk                                    */
/* -------------------------------------------------------------------------- */

export const fetchUserOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>('userOrders/fetchUserOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Не удалось получить заказы');
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    /** Полностью очищаем список заказов (например, при logout) */
    clearUserOrders(state) {
      state.orders = [];
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Неизвестная ошибка';
      });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

// export const { clearUserOrders } = userOrdersSlice.actions;
export default userOrdersSlice.reducer;
