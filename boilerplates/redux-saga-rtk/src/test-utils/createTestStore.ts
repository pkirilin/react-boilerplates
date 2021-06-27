import { AnyAction, applyMiddleware, createStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../app/root.reducer';
import rootSaga from '../app/root.saga';

export default function createTestStore(actions: AnyAction[]): Store {
  const initialState = actions.reduce(rootReducer, undefined);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
}
