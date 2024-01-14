import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirstAidInt {
  First_aid_ID: number;
  First_aid_Name: string;
  Description: string;
  Image_URL: string;
  Price: number;
}
interface FilterState {
  filter_fa: FirstAidInt[] | null,
  search: string,
  from: string ,
  to: string
}

const initialState: FilterState = {
  filter_fa: null,
  search: '',
  from: '',
  to: ''
};

const filter_first_aid_Slice = createSlice({
      name: 'filter_First_aids',
      initialState,
      reducers: {
        setFilter(state, action: PayloadAction<FirstAidInt[]>) {
          state.filter_fa = action.payload;
        },
        resetFilters(state) {
          state.filter_fa = null;
        },
        setParamsSearch(state, action: PayloadAction<{
          "search": string,
          "from": string, "to": string
        }>) {
          state.search = action.payload.search;
          state.from = action.payload.from;
          state.to = action.payload.to;
        },
        setSearch(state, action: PayloadAction<string>) {
          state.search = action.payload
        },
        setFrom(state, action: PayloadAction<string>) {
          state.from = action.payload
        },
        setTo(state, action: PayloadAction<string>) {
          state.to = action.payload
        },
      }
    }
);

export const { setFilter,
  resetFilters,
  setParamsSearch,
  setSearch,
  setFrom,
  setTo } = filter_first_aid_Slice.actions;

export default filter_first_aid_Slice.reducer;