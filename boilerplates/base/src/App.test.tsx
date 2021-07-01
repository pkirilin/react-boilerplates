import { render } from '@testing-library/react';
import App from './App';

describe('components/App', () => {
  describe('when mounted', () => {
    it('should render default message', () => {
      const result = render(<App />);

      expect(result.getByText(/React App/)).toBeVisible();
    });
  });
});
