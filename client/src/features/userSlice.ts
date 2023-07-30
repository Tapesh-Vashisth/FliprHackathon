import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface initialState {
    name: string,
    email: string,
    image: string | null,
    isLoggedIn: boolean,
    latitude: number | null,
    longitude: number | null,
    favouritePlaces: []
}

const initialState: initialState = {
    name: "",
    email: "",
    image: null,
    isLoggedIn: false,
    latitude: null,
    longitude: null,
    favouritePlaces: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
        setLoggedin: (state, action: PayloadAction <boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setState: (state, action: PayloadAction <{name: string, email: string, image: string | null, favouritePlaces: []}>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isLoggedIn = true;
            state.image = action.payload.image;
            state.favouritePlaces = action.payload.favouritePlaces;
        },
        setImage: (state, action: PayloadAction <string>) => {
            state.image = action.payload;
        },
        setName: (state, action: PayloadAction <string>) => {
            state.name = action.payload;
        },
        setLocation: (state, action: PayloadAction <{latitude: number, longitude: number}>) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude; 
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;