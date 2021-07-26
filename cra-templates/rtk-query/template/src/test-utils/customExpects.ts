import { TestBuilderRenderResult } from './test-utils.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toHaveRouterPath(path: string): R;
    }
  }
}

expect.extend({
  toHaveRouterPath(result: TestBuilderRenderResult, path: string) {
    return { message: () => '', pass: result.history.location.pathname === path };
  },
});
