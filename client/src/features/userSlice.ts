import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface initialState {
    alerts: []
}

const initialState: initialState = {
    alerts: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        
    }
});

export const NotificationActions = userSlice.actions;
export default userSlice.reducer;