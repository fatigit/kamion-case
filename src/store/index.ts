import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import shipmentSlice from "./slices/shipmentSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shipments: shipmentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
