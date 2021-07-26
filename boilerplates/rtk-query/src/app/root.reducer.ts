import { combineReducers } from '@reduxjs/toolkit';
import { counterApi } from '../features/counter/counter.api';
import counterReducer from '../features/counter/counter.slice';

const rootReducer = combineReducers({
  counter: counterReducer,
  [counterApi.reducerPath]: counterApi.reducer,
});

export default rootReducer;
