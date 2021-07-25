import { AnyAction, configureStore, Store } from '@reduxjs/toolkit';
import rootReducer from '../app/root.reducer';
import { counterApi } from '../features/counter/counter.api';
import { StoreBuilderStep } from './test-utils.types';

export default function createTestStore(...storeBuilderSteps: StoreBuilderStep[]): Store {
  const actions = getActions(...storeBuilderSteps);
  const initialState = actions.reduce(rootReducer, undefined);

  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(counterApi.middleware),
    devTools: false,
    preloadedState: initialState,
  });

  return store;
}

function getActions(...storeBuilderSteps: StoreBuilderStep[]): AnyAction[] {
  const actions: AnyAction[] = [];

  storeBuilderSteps.forEach(step => {
    step(actions);
  });

  return actions;
}
