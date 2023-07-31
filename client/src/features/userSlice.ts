import { createAsyncThunk, createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

interface initialState {
    name: string,
    email: string,
    image: string | null,
    isLoggedIn: boolean,
    latitude: number | null,
    longitude: number | null,
    favouritePlaces: any,
    favs: Array<any>
}

const initialState: initialState = {
    name: "",
    email: "",
    image: null,
    isLoggedIn: false,
    latitude: null,
    longitude: null,
    favouritePlaces: [],
    favs: []
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
        setLoggedin: (state, action: PayloadAction <boolean>) => {
            state.isLoggedIn = action.payload;
        },
        setState: (state, action: PayloadAction <{_doc: {name: string, email: string, image: string | null, favouritePlaces: []}, favs: []}>) => {
            state.name = action.payload._doc.name;
            state.email = action.payload._doc.email;
            state.isLoggedIn = true;
            state.image = action.payload._doc.image;
            state.favs = action.payload.favs;
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
        },
        addFav: (state, action: PayloadAction <any>) => {
            state.favs.push({
                place: action.payload.id,
                description: action.payload.description
            })
        },
        removeFav: (state, action: PayloadAction <string>) => {
            state.favs = state.favs.filter((x: any) => {
                return x.place !== action.payload
            })
        }
    }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;