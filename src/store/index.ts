import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { userApi } from "../services/user.ts";
import userReducer from "../store/slice/userSlice.ts";


export const store = configureStore({
    reducer: {
        user: userReducer,

        [userApi.reducerPath]: userApi.reducer,


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            userApi.middleware,
        ),
});



export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;