import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from "redux-logger";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
