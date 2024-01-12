// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  Is_Super: boolean;
  id: number;
  username: string;
  password: string;
}

const initialState: UserState = {
  Is_Super:false,
  id: -1,
  username: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{Is_Super:boolean; id:number; username: string; password: string }>) {
      state.Is_Super = action.payload.Is_Super;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.password = action.payload.password;

    },
    logout(state){
        state.Is_Super = false;
        state.id = -1;
        state.username = '';
        state.password = '';
    },


  },
});

export const { login,logout } = userSlice.actions;
export default userSlice.reducer;