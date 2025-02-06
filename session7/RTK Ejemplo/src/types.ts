import { combineReducers } from "@reduxjs/toolkit"
import timeReducer from './features/timeSlice';
export const rootReducer = combineReducers({
    reducer: {
        time: timeReducer,
    }
});

export type RootState = ReturnType<typeof rootReducer>;
