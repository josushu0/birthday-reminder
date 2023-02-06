import { birthdayInfo } from "../types"
import dayjs from "dayjs"
import "dayjs/locale/es"

function Card({birthdayInfo}: {birthdayInfo: birthdayInfo}) {
	const { name, cake, date} = birthdayInfo
	const dateFormat = dayjs(date).locale("es").format('D MMMM')

		return (
		<div className="card">
			<img src={birthdayInfo.photo} className="card__image" />
			<div className="card__info">
				<p>Nombre: {name}</p>
				<p>Cumpleaños: {dateFormat}</p>	
				<p>Pastel favorito: {cake}</p>
			</div>	
		</div>
	)
}

export default Card
