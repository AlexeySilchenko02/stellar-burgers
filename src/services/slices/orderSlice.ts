import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

interface TOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null | undefined;
}

const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

/* -------------------------------------------------------------------------- */
/*                                   Thunk                                    */
/* -------------------------------------------------------------------------- */

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  orderBurgerApi
);

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      /* ---------- pending ---------- */
      .addCase(submitOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      /* ---------- fulfilled ---------- */
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      /* ---------- rejected ---------- */
      .addCase(submitOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
