import App from './App';
import { createTest } from './test-utils';

describe('components/App', () => {
  describe('when mounted', () => {
    it('should render counter link', async () => {
      const result = createTest(<App></App>)
        .withReduxStore()
        .render();

      expect(result.getByText(/Counter/)).toBeVisible();
    });
  });
});
