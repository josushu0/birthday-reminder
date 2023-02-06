import { useAppSelector } from "../hooks/redux"
import Card from "./Card"
import { birthdayInfo } from "../types"

function CardList() {
	const birthdayInfo = useAppSelector((state) => state.birthdays)

	return (
		<div className="cardList">
			{birthdayInfo.loading === "succeeded"
				&&
				birthdayInfo.birthdays.map((birthday: birthdayInfo) => (
					<Card key={birthday.id} birthdayInfo={birthday} />
				))
			}
		</div>
	)
}

export default CardList
