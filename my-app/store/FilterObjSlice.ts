import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filter: string;
  from: string;
  to: string;
}

const initialState: FilterState = {
  filter: '',
  from: '',
  to: ''
};

const filterObjSlice = createSlice({
  name: 'filterObj',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    resetFilters(state) {
      state.filter = '';
      state.from = '';
      state.to = '';
    },
  },
});

export const { setFilter,
  setFrom,
  setTo,
  resetFilters } = filterObjSlice.actions;

export default filterObjSlice.reducer;