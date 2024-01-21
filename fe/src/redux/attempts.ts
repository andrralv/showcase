import { createSlice } from '@reduxjs/toolkit';

type State = {
  attempts: {
    value: number;
  }
}
const initialState = { value: 8 };

export const attemptSlice = createSlice({
  name: 'attempts',
  initialState,
  reducers: {
    decrease: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    }
  }
});

export const { decrease } = attemptSlice.actions;
export const selectAttempts = (state: State) => state.attempts.value;
export default attemptSlice.reducer;