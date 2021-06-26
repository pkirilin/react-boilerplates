import React from 'react';
import { useAppDispatch, useAppSelector } from '../../__shared__/hooks';
import { decrement, increment } from '../counterSlice';

export const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.count);
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <span>count: {count}</span>
      <div>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};
