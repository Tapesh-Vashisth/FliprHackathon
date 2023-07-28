import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialState {
    alerts: []
}

const initialState: initialState = {
    alerts: []
}

const NotificationSlice = createSlice({
    name: "nofication",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {

    }
});

export const NotificationActions = NotificationSlice.actions;
export default NotificationSlice.reducer;