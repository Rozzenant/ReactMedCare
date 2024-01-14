import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirstAidInt {
  FirstAid_ID: number;
  FirstAid_Name: string;
  Description: string;
  ImageURL: string;
  Price: number;
}

interface TraumaInt {
  TraumaID: number;
  Status: string;
  DateCreation: string;
  DateApproving?: string | null;
  DateEnd?: string | null;
  ModeratorId?: number | null;
  CreatorId?: number | null;
  FirstAidInTraumaList: FirstAidInt[];
  ConfirmationDoctor: string;
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