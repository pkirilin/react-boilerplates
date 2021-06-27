import { fireEvent } from '@testing-library/react';
import React from 'react';
import { createTest } from '../../../../test-utils';
import { withCounterIncrementedMultipleTimes } from '../../counter.testing';
import Counter from '../Counter';

describe('counter/components/Counter', () => {
  describe('when mounted', () => {
    it('should render count 0', () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .render();

      expect(result.getByText('count: 0')).toBeVisible();
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

  describe('when redirect button clicked', () => {
    it('should redirect to main page', async () => {
      const result = createTest(<Counter></Counter>)
        .withReduxStore()
        .withRouter('/counter')
        .afterRender(result => {
          fireEvent.click(result.getByText(/Redirect/));
        })
        .render();

      expect(result).toHaveRouterPath('/');
    });
  });
});
