import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
// import { useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;