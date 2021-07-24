import { configureStore } from '@reduxjs/toolkit';
import { counterApi } from '../features/counter/counter.api';
import rootReducer from './root.reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(counterApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
