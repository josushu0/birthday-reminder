import CardList from "../components/CardList"
import Navbar from "../components/Navbar"
import { useAppDispatch } from "../hooks/redux"
import { getBirthdays, sortBirthdays } from "../store/slices/bithdays/birthdaysSlice"

function Home() {
	const dispatch = useAppDispatch()
	dispatch(getBirthdays())
		.then(() => dispatch(sortBirthdays()))
	return (
		<>
			<Navbar />
			<CardList />
		</>
	)
}

export default Home
