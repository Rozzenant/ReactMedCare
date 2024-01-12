import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface ObjectInt {
//     ID_Object: number;
//     Name_Obj: string;
//     Region: string;
//     Year: number;
//     Opener: string;
//     Status: string;
//     Image_Url: string;
// }

interface FirstAidInt {
  FirstAid_ID: number;
  FirstAid_Name: string;
  Description: string;
  ImageURL: string;
  Price: number;
}
// interface Expedition {
//   ID_Expedition: number;
//   Name_Exp: string;
//   DateStart: string;
//   DateEnd: string | null;
//   DateApproving: string | null;
//   Status: string;
//   Leader: string;
//   ModeratorId: number | null;
//   CreatorId: number | null;
//   Describe: string | null;
//   Objects: ObjectInt[];
//   Archive: string | null;
// }

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