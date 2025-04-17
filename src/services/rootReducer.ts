import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import authReducer from './slices/authSlice';
import feedsReducer from './slices/feedsSlice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  feeds: feedsReducer
});

export default rootReducer;
