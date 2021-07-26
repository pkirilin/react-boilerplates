import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../__shared__/hooks';
import { useSetCountMutation } from '../counter.api';
import { decrement, increment } from '../counter.slice';

const Counter: React.FC = () => {
  const count = useAppSelector(state => state.counter.count);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [setCount, { isLoading }] = useSetCountMutation();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleSetCount = () => {
    setCount();
  };

  const handleRedirect = () => {
    history.push('/');
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
          Set count (async)
        </button>
      </p>
      <p>
        <button onClick={handleRedirect}>Redirect to main</button>
      </p>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default Counter;
