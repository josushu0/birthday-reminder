import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pb } from "../../../pocketbase/pocketbase";
import { birthdayInfo } from "../../../types"
import dayjs from "dayjs"
import dayOfYear from "dayjs/plugin/dayOfYear"

dayjs.extend(dayOfYear)

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
		const today = dayjs()
		records.forEach((record) => {
			let date = dayjs(record.date)
			if(date.dayOfYear() < today.dayOfYear()) {
				date = date.set('year', today.get('year') + 1)
			} else {
				date = date.set('year', today.get('year'))
			}
			birthdays.push({
				id: record.id,
				collectionId: record.collectionId,
				name: record.name,
				date: date.toString(),
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
			state.birthdays.sort((a,b) => {
				let dateA = dayjs(a.date)
				let dateB = dayjs(b.date)
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
