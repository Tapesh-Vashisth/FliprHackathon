import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from "redux-logger";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
  reducer: {
    notification: notificationReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(reduxLogger)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
