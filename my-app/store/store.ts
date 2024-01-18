import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import filter_First_aids_Reducer from './Filter_first_aid_Slice.ts';
import traumas from '../../store/TraumaSlice.ts'
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({

    reducer: {

    user: userReducer,
    traumas: traumas,
    filterFirst_Aid: filter_First_aids_Reducer,

},
});

export default store;