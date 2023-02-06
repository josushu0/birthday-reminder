import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pb } from "../../../pocketbase/pocketbase";
import { birthdayInfo } from "../../../types"
import dayjs from "dayjs"
import dayOfYear from "dayjs/plugin/dayOfYear"

interface birthdayState {
	birthdays: birthdayInfo[]
	loading: 'loading' | 'succeeded'
}

const initialState = {
	birthdays: [],
	loading: 'loading'
} as birthdayState

export const getBirthdays = createAsyncThunk(
	'birthdays/getBirthdays',
	async () => {
		let birthdays: birthdayInfo[] = []
		const records = await pb.collection('birthdays').getFullList()
		records.forEach((record) => {
			birthdays.push({
				id: record.id,
				collectionId: record.collectionId,
				name: record.name,
				date: record.date,
				cake: record.cake,
				photo: pb.getFileUrl(record, record.photo)
			})
		})
		return birthdays
	}
)

export const birthdaysSlice = createSlice({
	name: 'birthdays',
	initialState,
	reducers: {
		sortBirthdays(state) {
			const today = dayjs()
			state.birthdays.sort((a,b) => {
				const dateA = dayjs(a.date)
				const dateB = dayjs(b.date)
				dateA.dayOfYear() < today.dayOfYear() ?? dateA.year(today.get('year') + 1)
				dateB.dayOfYear() < today.dayOfYear() ?? dateB.year(today.get('year') + 1)
				if(dateA.isBefore(dateB)) return -1
				if(dateA.isAfter(dateB)) return 1
				return 0
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
