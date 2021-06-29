import { AnyAction, Store } from '@reduxjs/toolkit';
import { RenderResult, waitForOptions } from '@testing-library/react';
import { History } from 'history';

export interface TestBuilder {
  withReduxStore(...storeBuilderSteps: StoreBuilderStep[]): TestBuilder;
  withRouter(path?: string): TestBuilder;
  setupMock<T>(name: string, setup: () => jest.Mock<T>): TestBuilder;
  setupAction(name: string, action: TestBuilderAction): TestBuilder;
  render(): TestBuilderRenderResult;
}

export interface TestBuilderRenderResult extends RenderResult {
  store: Store;
  history: History;
  getMock(name: string): jest.Mock;
  waitForMockCall(name: string, callTimes?: number, options?: waitForOptions): Promise<void>;
  execute(...names: string[]): void;
}

export interface TestBuilderRenderResultContext {
  store: Store;
  history: History;
  mocksMap: Map<string, jest.Mock>;
  actionsMap: Map<string, TestBuilderAction>;
}

export type WrapperRenderer = (child: React.ReactElement) => React.ReactElement;

export type TestBuilderAction = (result: TestBuilderRenderResult) => void;

export type StoreBuilderStep = (actions: AnyAction[]) => void;

export type StoreBuilderStepCreator<TArg = unknown> = (arg: TArg) => StoreBuilderStep;
