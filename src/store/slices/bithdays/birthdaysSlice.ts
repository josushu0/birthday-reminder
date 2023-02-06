import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface birthday {
	name: string
	birthday: [number, number]
	cake: string
}

interface birthdayState {
	birthdays: birthday[]
	loading: 'loading' | 'succeeded'
}

const initialState = {
	birthdays: [],
	loading: 'loading'
} as birthdayState

export const getBirthdays = createAsyncThunk(
	'birthdays/getBirthdays',
	async () => {
		let birthdays: birthday[] = []
		return birthdays
	}
)

export const birthdaysSlice = createSlice({
	name: 'birthdays',
	initialState,
	reducers: {
		sortBirthdays(state) {
			const yearMilliseconds = 1000 * 60 * 60 * 24 * 365
			const today = new Date()
			state.birthdays.sort((a, b) => {
				let timeA = new Date(today.getFullYear(), a.birthday[1] - 1, a.birthday[0]).getTime()
				timeA = today.getTime() - timeA
				if (timeA > 0) timeA = (timeA + yearMilliseconds) * -1
				let timeB = new Date(today.getFullYear(), b.birthday[1] - 1, b.birthday[0]).getTime()
				timeB = today.getTime() - timeB
				if (timeB > 0) timeB = (timeB + yearMilliseconds) * -1
				return timeB - timeA
			})
			state.loading = "succeeded"
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getBirthdays.fulfilled, (state, action) => {
			state.birthdays = action.payload
		})
	}
})

export const { sortBirthdays } = birthdaysSlice.actions

export default birthdaysSlice.reducer
