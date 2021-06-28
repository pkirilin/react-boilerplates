import React from 'react';
import { Store } from '@reduxjs/toolkit';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory, History } from 'history';
import createTestStore from './createTestStore';
import {
  TestBuilder,
  WrapperRenderer,
  TestBuilderAction,
  TestBuilderRenderResult,
  TestBuilderRenderResultContext,
} from './test-utils.types';

export default function createTest(ui: React.ReactElement): TestBuilder {
  let store: Store | null = null;
  let history: History | null = null;

  let storeCreated = false;
  let historyCreated = false;

  const wrapperRenderers: WrapperRenderer[] = [];
  const actionsMap = new Map<string, TestBuilderAction>();
  const mocksMap = new Map<string, jest.Mock>();

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

    setupMock<T>(name: string, setup: () => jest.Mock<T>) {
      if (mocksMap.has(name)) {
        throw new Error(`Mock with name '${name}' already exists`);
      }

      mocksMap.set(name, setup());
      return this;
    },

    setupAction(name, action) {
      actionsMap.set(name, action);
      return this;
    },

    render() {
      const wrappedUi = wrapperRenderers.reduceRight((prev, render) => render(prev), ui);

      const renderResult = render(<React.Fragment>{wrappedUi}</React.Fragment>);

      const testBuilderRenderResult = createTestBuilderRenderResult(renderResult, {
        store: tryGetValueOrError(store, storeCreated, () => createTestStore(), 'Redux store does not exist'),
        history: tryGetValueOrError(
          history,
          historyCreated,
          () => createBrowserHistory(),
          'Router history does not exist',
        ),
        mocksMap,
        actionsMap,
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

function createTestBuilderRenderResult(
  renderResult: RenderResult,
  { store, history, mocksMap, actionsMap }: TestBuilderRenderResultContext,
): TestBuilderRenderResult {
  return {
    ...renderResult,
    store,
    history,

    getMock(name: string) {
      if (!mocksMap.has(name)) {
        throw new Error(`Mock with name '${name}' does not exist`);
      }
      return mocksMap.get(name) as jest.Mock;
    },

    async waitForMockCall(name: string, callTimes = 1, options) {
      if (!mocksMap.has(name)) {
        throw new Error(`Mock with name '${name}' does not exist`);
      }

      const mock = mocksMap.get(name);
      await waitFor(() => expect(mock).toHaveBeenCalledTimes(callTimes), options);
    },

    execute(...names: string[]) {
      names.forEach(name => {
        if (actionsMap.has(name)) {
          const action = actionsMap.get(name) as TestBuilderAction;
          action(this);
        }
      });
    },
  };
}
