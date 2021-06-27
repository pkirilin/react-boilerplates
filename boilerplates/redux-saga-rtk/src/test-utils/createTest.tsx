import React from 'react';
import { AnyAction, Store } from '@reduxjs/toolkit';
import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import createTestStore from './createTestStore';

interface TestBuilder {
  withReduxStore(actions?: AnyAction[]): TestBuilder;
  withRouter(): TestBuilder;
  afterRender(action: ActionAfterRender): TestBuilder;
  render(): TestBuilderRenderResult;
}

interface TestBuilderRenderResult extends RenderResult {
  store: Store;
  history: History;
}

type WrapperRenderer = (child: React.ReactElement) => React.ReactElement;

type ActionAfterRender = (result: TestBuilderRenderResult) => void;

export default function createTest(ui: React.ReactElement): TestBuilder {
  let store: Store | null = null;
  let history: History | null = null;

  const wrapperRenderers: WrapperRenderer[] = [];
  const actionsAfterRender: ActionAfterRender[] = [];

  return {
    withReduxStore(actions = []) {
      wrapperRenderers.push(child => {
        store = createTestStore(actions);
        return <Provider store={store}>{child}</Provider>;
      });

      return this;
    },

    withRouter() {
      wrapperRenderers.push(child => {
        history = createBrowserHistory();
        return <Router history={history}>{child}</Router>;
      });

      return this;
    },

    afterRender(action) {
      actionsAfterRender.push(action);
      return this;
    },

    render() {
      const wrappedUi = wrapperRenderers.reduceRight((prev, render) => render(prev), ui);
      const renderResult = render(<React.Fragment>{wrappedUi}</React.Fragment>);
      const testBuilderRenderResult: TestBuilderRenderResult = {
        ...renderResult,
        store: tryGetValueOrError(store, 'Redux store does not exist'),
        history: tryGetValueOrError(history, 'Router history does not exist'),
      };

      actionsAfterRender.forEach(action => {
        action(testBuilderRenderResult);
      });

      return testBuilderRenderResult;
    },
  };
}

function tryGetValueOrError<T>(value: T | null, errorMessage: string): T {
  if (value === null) {
    throw new Error(errorMessage);
  }

  return value;
}
