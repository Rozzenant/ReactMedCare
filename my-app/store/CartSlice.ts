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

interface CartState {
  trauma: TraumaInt | null;
}

const initialState: CartState = {
  trauma: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<TraumaInt>) {
      state.trauma = action.payload;
    },
    removeFromCart(state) {
      state.trauma = null;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;