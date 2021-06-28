import { fireEvent } from '@testing-library/react';
import React from 'react';
import { asJestMock, createTest } from '../../../../test-utils';
import api from '../../api';
import { withCounterIncrementedMultipleTimes } from '../../counter.testing';
import Counter from '../Counter';

jest.mock('../../api');

describe('counter/components/Counter', () => {
  describe('when mounted', () => {
    it('should render count 0', () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .render();

      expect(result.getByText('count: 0')).toBeVisible();
    });
  });

  describe('when increment clicked', () => {
    it('should increment count', () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .setupAction('click increment', result => {
          fireEvent.click(result.getByText('+'));
        })
        .render();

      result.execute('click increment');

      expect(result.getByText('count: 1')).toBeVisible();
    });
  });

  describe('when decrement clicked', () => {
    it('should decrement count', () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .setupAction('click decrement', result => {
          fireEvent.click(result.getByText('-'));
        })
        .render();

      result.execute('click decrement');

      expect(result.getByText('count: -1')).toBeVisible();
    });
  });

  describe('when counter incremented 5 times', () => {
    it('should render count 5', () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore(withCounterIncrementedMultipleTimes(5))
        .render();

      expect(result.getByText('count: 5')).toBeVisible();
    });
  });

  describe('when set count clicked', () => {
    it('should fetch and set count from api', async () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .setupMock('api', () => asJestMock(api.getCount).mockResolvedValueOnce(123))
        .setupAction('click set count', result => {
          fireEvent.click(result.getByText(/Set count/));
        })
        .render();

      result.execute('click set count');

      expect(await result.findByText('count: 123')).toBeVisible();
    });
  });

  describe('when redirect button clicked', () => {
    it('should redirect to main page', async () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .withRouter('/counter')
        .setupAction('click redirect', result => {
          fireEvent.click(result.getByText(/Redirect/));
        })
        .render();

      result.execute('click redirect');

      expect(result).toHaveRouterPath('/');
    });
  });
});
