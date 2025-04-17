import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import feedsReducer from './slices/feedsSlice';
import userOrdersReducer from './slices/userOrdersSlice';
import burgerConstructorReducer from './slices/burgerConstructorSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feeds: feedsReducer,
  order: orderReducer,
  userOrders: userOrdersReducer
});

export default rootReducer;
