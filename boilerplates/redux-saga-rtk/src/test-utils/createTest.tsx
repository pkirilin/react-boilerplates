import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import createTestStore from './createTestStore';
import { TestBuilder, WrapperRenderer, ActionAfterRender, TestBuilderRenderResult } from './test-utils.types';

export default function createTest(ui: React.ReactElement): TestBuilder {
  let store: Store | null = null;
  let history: History | null = null;

  const wrapperRenderers: WrapperRenderer[] = [];
  const actionsAfterRender: ActionAfterRender[] = [];

  return {
    withReduxStore(...steps) {
      wrapperRenderers.push(child => {
        store = createTestStore(...steps);
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
