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

  let storeCreated = false;
  let historyCreated = false;

  const wrapperRenderers: WrapperRenderer[] = [];
  const actionsAfterRender: ActionAfterRender[] = [];

  return {
    withReduxStore(...steps) {
      wrapperRenderers.push(child => {
        store = createTestStore(...steps);
        storeCreated = true;
        return <Provider store={store}>{child}</Provider>;
      });

      return this;
    },

    withRouter(path) {
      wrapperRenderers.push(child => {
        history = createBrowserHistory();
        historyCreated = true;
        if (path) {
          history.push(path);
        }
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
        store: tryGetValueOrError(store, storeCreated, () => createTestStore(), 'Redux store does not exist'),
        history: tryGetValueOrError(
          history,
          historyCreated,
          () => createBrowserHistory(),
          'Router history does not exist',
        ),
      };

      actionsAfterRender.forEach(action => {
        action(testBuilderRenderResult);
      });

      return testBuilderRenderResult;
    },
  };
}

function tryGetValueOrError<T>(value: T | null, isCreated: boolean, createDefault: () => T, errorMessage: string): T {
  if (!isCreated) {
    return createDefault();
  }

  if (value === null) {
    throw new Error(errorMessage);
  }

  return value;
}
