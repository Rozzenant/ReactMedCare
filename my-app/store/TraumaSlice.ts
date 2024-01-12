import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface FirstAidInt {
  FirstAid_ID: number;
  FirstAid_Name: string;
  Description: string;
  ImageURL: string;
  Price: number;
}

interface TraumaInt {
  Trauma_ID: number;
  Trauma_Name: string | null;
  Status: string;
  Date_Creation: string;
  Date_Approving?: string | null;
  Date_End?: string | null;
  Moderator?: number | null;
  Creator?: number | null;
  First_aid_in_Trauma_List: FirstAidInt[];
  Confirmation_Doctor: string;
}

interface TraumasState {
  traumas: TraumaInt[];
}

const initialState: TraumasState = {
  traumas: [],
};

const traumasSlice = createSlice({
  name: 'traumas',
  initialState,
  reducers: {
    setTraumas(state, action: PayloadAction<TraumaInt[]>) {
      state.traumas = action.payload;
    },

  },
});

export const { setTraumas} = traumasSlice.actions;
export default traumasSlice.reducer;