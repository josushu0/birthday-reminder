import { birthdayInfo } from "../types"

function Card({birthdayInfo}: {birthdayInfo: birthdayInfo}) {
	const { name, cake, date} = birthdayInfo
		return (
		<div className="card">
			<img src={birthdayInfo.photo} className="card__image" />
			<div className="card__info">
				<p>Nombre: {name}</p>
				<p>Cumpleaños: {date}</p>	
				<p>Pastel favorito: {cake}</p>
			</div>	
		</div>
	)
}

export default Card
