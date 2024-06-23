import {configureStore} from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "../services/user.ts";
// import userReducer from "../store/slice/userSlice.ts";
import authReducer from "../store/slice/authSlice.ts";
// import ChangeUser from "./slice/ChangeUserSlice.ts";

export const store = configureStore({
    reducer: {
        // user: userReducer,
        // changeUser:ChangeUser,
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