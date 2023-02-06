import { birthdayInfo } from "../types"
import dayjs from "dayjs"
import "dayjs/locale/es"
import Countdown from "./Countdown"
import { useState } from "react"

function Card({birthdayInfo}: {birthdayInfo: birthdayInfo}) {
	const [active, setActive] = useState(false)
	const { name, cake, date} = birthdayInfo
	const today = dayjs()
	const dateObject = dayjs(date)
	const dateFormat = dateObject.locale("es").format('D MMMM')
	if (dateObject.diff(today, 'day') <= 7) {
		setActive(true)
	}

	function toggleActive() {
		active ? setActive(false) : setActive(true)
	}

		return (
		<div className="card" onClick={toggleActive}>
			<img src={birthdayInfo.photo} className="card__image" />
			<div className="card__info">
				{active &&
					<>
						<Countdown date={dateObject} />
						<p>Pastel favorito: {cake}</p>
					</>
				}
				<p>Nombre: {name}</p>
				<p>Cumpleaños: {dateFormat}</p>	
			</div>	
		</div>
	)
}

export default Card
