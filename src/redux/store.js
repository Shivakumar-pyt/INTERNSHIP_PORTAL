import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import companyReducer from "./companySlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';


const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer,
    company: companyReducer
})

const persistedReducer = persistReducer(persistConfig,rootReducer);

export default configureStore({
    reducer: persistedReducer
})