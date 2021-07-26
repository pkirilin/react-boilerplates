import { createSlice } from '@reduxjs/toolkit';
import { counterApi } from './counter.api';

export type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },

    decrement(state) {
      state.count--;
    },
  },
  extraReducers: builder =>
    builder.addMatcher(counterApi.endpoints.setCount.matchFulfilled, (state, { payload }) => {
      state.count = payload;
    }),
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
