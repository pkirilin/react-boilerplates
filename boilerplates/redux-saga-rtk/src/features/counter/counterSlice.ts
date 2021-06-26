import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CounterState = {
  count: number;
  isLoading: boolean;
};

const initialState: CounterState = {
  count: 0,
  isLoading: false,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.count++;
    },
    decrement: state => {
      state.count--;
    },

    setCount(state) {
      state.isLoading = true;
    },

    setCountSuccess(state, action: PayloadAction<number>) {
      state.count = action.payload;
      state.isLoading = false;
    },
  },
});

export const { increment, decrement, setCount, setCountSuccess } = counterSlice.actions;

export default counterSlice.reducer;
