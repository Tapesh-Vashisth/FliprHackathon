import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface initialState {
    name: string,
    email: string,
    image: string | null,
    isLoggedIn: boolean
}

const initialState: initialState = {
    name: "",
    email: "",
    image: null,
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
        setLoggedin: (state, action: PayloadAction <boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setState: (state, action: PayloadAction <{name: string, email: string, image: string | null}>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.image = action.payload.image;
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;