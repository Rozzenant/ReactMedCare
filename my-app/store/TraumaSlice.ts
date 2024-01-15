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
  traumas: TraumaInt[] | null;
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
    removeTraumas(state){
      state.traumas = null;
    },

  },
});

export const { setTraumas, removeTraumas} = traumasSlice.actions;
export default traumasSlice.reducer;