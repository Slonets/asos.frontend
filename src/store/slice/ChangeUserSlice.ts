import {createSlice} from "@reduxjs/toolkit";
import {IUser} from "../../components/authentication/login/type.ts";

const initialState: IUser = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    image: "",
    roles: "",
};

const changeUserSlice = createSlice({
    name: "infoUser",
    initialState,
    reducers: {

        updateUserField(state, action)
        {
            const { field, value } = action.payload;
            return { ...state, [field]: value };
        },
        clearUser()
        {
            return initialState;
        },
    },
});

export const {  updateUserField, clearUser } = changeUserSlice.actions;

export default changeUserSlice.reducer;