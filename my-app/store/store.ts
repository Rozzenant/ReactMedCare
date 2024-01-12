import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'
import cartReducer from './CartSlice';
import traumasReducer from './TraumaSlice';
import filterObjReducer from './FilterObjSlice';
const shouldEnableDevTools = process.env.NODE_ENV !== 'production';
export type RootState = ReturnType<typeof store.getState>;
const store = configureStore({

    reducer: {

    user: userReducer,
    traumas: traumasReducer,
    cart: cartReducer,
    filterObj: filterObjReducer,
},
devTools: shouldEnableDevTools,
});

export default store;