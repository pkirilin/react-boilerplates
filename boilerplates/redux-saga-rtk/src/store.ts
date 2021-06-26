import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import counterReducer from './features/counter/counterSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
