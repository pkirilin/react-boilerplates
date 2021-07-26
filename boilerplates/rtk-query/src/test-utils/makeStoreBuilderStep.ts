import { AnyAction } from '@reduxjs/toolkit';
import { StoreBuilderStepCreator } from './test-utils.types';

export default function makeStoreBuilderStep<TArg>(
  makeFn: (actions: AnyAction[], arg: TArg) => void,
): StoreBuilderStepCreator<TArg> {
  return arg => {
    return actions => {
      makeFn(actions, arg);
    };
  };
}
