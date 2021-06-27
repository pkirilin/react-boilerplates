import { makeStoreBuilderStep } from '../../test-utils';
import { increment } from './counter.slice';

export const withCounterIncrementedMultipleTimes = makeStoreBuilderStep<number>((actions, count) => {
  for (let i = 0; i < count; i++) {
    actions.push(increment());
  }
});
