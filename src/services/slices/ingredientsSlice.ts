import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

type TIngredientsState = {
  items: TIngredient[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: TIngredientsState = {
  items: [],
  isLoading: false,
  hasError: false
};

// Асинхронная Thunk-функция для загрузки ингредиентов с сервера
export const fetchIngredients = createAsyncThunk<TIngredient[], void>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getIngredientsApi();
      return data; // возвращаем список ингредиентов
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // pending
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      // fulfilled
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      // rejected
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  }
});

// Экспортируем сам редьюсер по умолчанию
export default ingredientsSlice.reducer;
