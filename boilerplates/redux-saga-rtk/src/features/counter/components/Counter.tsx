import React from 'react';
import { useAppDispatch, useAppSelector } from '../../__shared__/hooks';
import { decrement, increment, setCount } from '../counterSlice';

export const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.count);
  const isLoading = useAppSelector(state => state.counter.isLoading);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleSetCount = () => {
    dispatch(setCount());
  };

  return (
    <div>
      <span>count: {count}</span>
      <p>
        <button onClick={handleDecrement} disabled={isLoading}>
          -
        </button>
        <button onClick={handleIncrement} disabled={isLoading}>
          +
        </button>
      </p>
      <p>
        <button onClick={handleSetCount} disabled={isLoading}>
          Set count 1000 (async)
        </button>
      </p>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
