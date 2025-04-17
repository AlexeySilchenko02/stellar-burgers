import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { v4 as uuidv4 } from 'uuid';

/* -------------------------------------------------------------------------- */
/*                      Тип ингредиента внутри конструктора                   */
/* -------------------------------------------------------------------------- */

export type TConstructorIngredient = TIngredient & { uuid: string };

/* -------------------------------------------------------------------------- */
/*                                   State                                    */
/* -------------------------------------------------------------------------- */

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

/* -------------------------------------------------------------------------- */
/*                                   Slice                                    */
/* -------------------------------------------------------------------------- */

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },

    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        uuid: uuidv4()
      });
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== action.payload
      );
    },

    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const dragged = state.ingredients[fromIndex];
      state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, dragged);
    },

    clearConstructor: () => initialState
  }
});

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
