import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FirstAidInt {
  First_aid_ID: number;
  First_aid_Name?: string;
  Description?: string;
  Image_URL?: string;
  Price?: number;
}

interface TraumaInt {
  Trauma_ID: number;
  Trauma_Name?: string | null;
  Status: string;
  Date_Creation: string;
  Date_Approving?: string | null;
  Date_End?: string | null;
  Moderator_Name: string;
  Creator_Name: string;
  First_aid_in_Trauma_List?: FirstAidInt[];
  Confirmation_Doctor?: string;
}

interface TraumasState {
  traumas: TraumaInt[];
  search: string,
  from: string,
  to: string,
  status: string
}

const initialState: TraumasState = {
  traumas: [],
  search: '',
  from: '',
  to: '',
  status: 'Все статусы'
};

const traumasSlice = createSlice({
  name: 'traumas',
  initialState,
  reducers: {
    setTraumas(state, action: PayloadAction<TraumaInt[]>) {
      state.traumas = action.payload;
    },
    setSearch(state, action: PayloadAction<string>){
      state.search = action.payload;
    },
    setFromDate(state, action: PayloadAction<string>){
      state.from = action.payload;
    },
    setToDate(state, action: PayloadAction<string>){
      state.to = action.payload;
    },
    setStatus(state, action: PayloadAction<string>){
      state.status = action.payload;
    },
    setParamsTraumas(state, action: PayloadAction<{
      "search": string,
      "from": string,
      "to": string,
      "status": string}>){

      state.search = action.payload.search;
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.status = action.payload.status;
    },
    removeParams(state){
      state.search = '';
      state.from = '';
      state.to = '';
      state.status = 'Все статусы';
    },
    removeTraumas(state){
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-expect-error
      state.traumas = <TraumaInt>[];
    },

  },
});

export const { setTraumas,
  setParamsTraumas,
  setFromDate,
  setToDate,
  setSearch,
  setStatus,
  removeParams,
  removeTraumas} = traumasSlice.actions;
export default traumasSlice.reducer;