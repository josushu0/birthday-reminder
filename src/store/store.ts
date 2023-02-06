import { configureStore } from "@reduxjs/toolkit";
import birthdaysReducer from './slices/birthdays/birthdaysSlice'

export const store = configureStore({
	reducer: {
		birthdays: birthdaysReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
