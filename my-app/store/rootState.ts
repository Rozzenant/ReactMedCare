import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
// import cartReducer from './CartSlice'
import traumasReducer from './TraumaSlice'
import filter_fa_Reducer from './Filter_first_aid_Slice'


const rootReducer = combineReducers({
  user: userReducer,
  traumas: traumasReducer,
  filter_fa: filter_fa_Reducer
  // cart: cartReducer,

});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;