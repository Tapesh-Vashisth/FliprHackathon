import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface initialState {
    name: string,
    email: string,
    image: string,
    isLoggedIn: boolean
}

const initialState: initialState = {
    name: "",
    email: "",
    image: "",
    isLoggedIn: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    }
});

export const NotificationActions = userSlice.actions;
export default userSlice.reducer;