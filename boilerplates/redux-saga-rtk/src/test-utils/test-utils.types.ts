import { AnyAction, Store } from '@reduxjs/toolkit';
import { RenderResult } from '@testing-library/react';
import { History } from 'history';

export interface TestBuilder {
  withReduxStore(...storeBuilderSteps: StoreBuilderStep[]): TestBuilder;
  withRouter(path?: string): TestBuilder;
  afterRender(action: ActionAfterRender): TestBuilder;
  render(): TestBuilderRenderResult;
}

export interface TestBuilderRenderResult extends RenderResult {
  store: Store;
  history: History;
}

export type WrapperRenderer = (child: React.ReactElement) => React.ReactElement;

export type ActionAfterRender = (result: TestBuilderRenderResult) => void;

export type StoreBuilderStep = (actions: AnyAction[]) => void;

export type StoreBuilderStepCreator<TArg = unknown> = (arg: TArg) => StoreBuilderStep;
