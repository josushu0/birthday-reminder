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
				let dateA = dayjs(a.date).set('year', today.get('year'))
				let dateB = dayjs(b.date).set('year', today.get('year'))
				if (dateA.dayOfYear() < today.dayOfYear()) {
					dateA = dateA.add(1, 'year')
				}
				if (dateB.dayOfYear() < today.dayOfYear()) {
					dateB = dateB.add(1, 'year')
				}
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
