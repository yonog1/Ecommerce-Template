import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "../../features/contact/counterSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { basketSlice } from "../../features/basket/basketSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        basket: basketSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// allows to dispatch actions (functions) that update the state in the store
export const useAppDispatch = () => useDispatch<AppDispatch>();

// allows to select (listen to) the state that is in the store.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
