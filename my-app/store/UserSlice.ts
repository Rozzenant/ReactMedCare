// slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import trauma_history from "../components/Traumas/trauma_history.tsx";

interface UserState {
  Is_Super: boolean;
  id: number;
  username: string;
  password: string;
  trauma_draft: boolean;
  trauma_draft_id: string | null;
  jwt: string | null;
}

const initialState: UserState = {
  Is_Super:false,
  id: -1,
  username: '',
  password: '',
  trauma_draft: false,
  trauma_draft_id: null,
  jwt: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    login(state, action: PayloadAction<{Is_Super:boolean;
                                                             id:number;
                                                             username: string;
                                                             password: string;
                                                             jwt: string}>)
    {
      state.Is_Super = action.payload.Is_Super;
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.jwt = action.payload.jwt;

    },

    logout(state){
        state.Is_Super = false;
        state.id = -1;
        state.username = '';
        state.password = '';
        state.trauma_draft = false;
        state.trauma_draft_id = null;
        state.jwt = null;
    },

    change_status_trauma_draft(state){
        state.trauma_draft = !state.trauma_draft;
    },

    set_trauma_draft_id(state, action: PayloadAction<{trauma_draft_id: string | null}>){
        state.trauma_draft_id = action.payload.trauma_draft_id;
    },
    set_jwt(state, action: PayloadAction<{jwt: string}>){
        state.jwt = action.payload.jwt;
        // console.log(state.jwt)
}


  },
});

export const { login,
            logout,
            change_status_trauma_draft,
            set_trauma_draft_id,
            set_jwt} = userSlice.actions;
export default userSlice.reducer;