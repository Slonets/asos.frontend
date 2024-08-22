import {configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "../services/user.ts";
import authReducer from "../store/slice/authSlice.ts";


export const store = configureStore({
    reducer: {
        auth:authReducer,
        [userApi.reducerPath]: userApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;