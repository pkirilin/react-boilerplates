import { AnyAction, Store } from '@reduxjs/toolkit';
import { RenderResult } from '@testing-library/react';
import { History } from 'history';

export interface TestBuilder {
  // TODO: add StoreBuilder
  withReduxStore(actions?: AnyAction[]): TestBuilder;
  withRouter(): TestBuilder;
  afterRender(action: ActionAfterRender): TestBuilder;
  render(): TestBuilderRenderResult;
}

export interface TestBuilderRenderResult extends RenderResult {
  store: Store;
  history: History;
}

export type WrapperRenderer = (child: React.ReactElement) => React.ReactElement;

export type ActionAfterRender = (result: TestBuilderRenderResult) => void;
