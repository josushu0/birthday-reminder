import { useAppSelector } from "../hooks/redux"
import Card from "./Card"

interface birthdayInfo {
	name: string
	birthday: [number, number]
	cake: string
}

function CardList() {
	const birthdayInfo = useAppSelector((state) => state.birthdays)

	return (
		<div className="cardList">
			{birthdayInfo.loading === "succeeded"
				&&
				birthdayInfo.birthdays.map((birthday: birthdayInfo) => (
					<Card key={birthday.name} birthdayInfo={birthday} />
				))
			}

		</div>
	)
}

export default CardList
