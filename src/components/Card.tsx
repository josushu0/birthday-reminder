interface birthdayInfo {
	name: string
	birthday: [number, number]
	cake: string
}

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Noviembre", "Diciembre"]

function Card({birthdayInfo}: {birthdayInfo: birthdayInfo}) {
	const { name, cake, birthday } = birthdayInfo
	const [day, month] = birthday
	const birthdayDate = `${day} de ${months[month - 1]}`
	const today = new Date().getTime()
		return (
		<div className="card">
			<div className="card__image"></div>
			<div className="card__info">
				<p>Nombre: {name}</p>
				<p>Cumpleaños: {birthdayDate}</p>	
				<p>Pastel favorito: {cake}</p>
			</div>	
		</div>
	)
}

export default Card
