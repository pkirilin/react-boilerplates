import { AnyAction, applyMiddleware, createStore, Store } from '@reduxjs/toolkit';
import rootReducer from '../app/root.reducer';
import { StoreBuilderStep } from './test-utils.types';

export default function createTestStore(...storeBuilderSteps: StoreBuilderStep[]): Store {
  const actions = getActions(...storeBuilderSteps);
  const initialState = actions.reduce(rootReducer, undefined);

  const store = createStore(rootReducer, initialState, applyMiddleware());

  return store;
}

function getActions(...storeBuilderSteps: StoreBuilderStep[]): AnyAction[] {
  const actions: AnyAction[] = [];

  storeBuilderSteps.forEach(step => {
    step(actions);
  });

  return actions;
}
