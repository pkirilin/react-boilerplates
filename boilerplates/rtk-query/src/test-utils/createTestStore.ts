import { AnyAction, applyMiddleware, createStore, Store } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../app/root.reducer';
import rootSaga from '../app/root.saga';
import { StoreBuilderStep } from './test-utils.types';

export default function createTestStore(...storeBuilderSteps: StoreBuilderStep[]): Store {
  const actions = getActions(...storeBuilderSteps);
  const initialState = actions.reduce(rootReducer, undefined);
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return store;
}

function getActions(...storeBuilderSteps: StoreBuilderStep[]): AnyAction[] {
  const actions: AnyAction[] = [];

  storeBuilderSteps.forEach(step => {
    step(actions);
  });

  return actions;
}
