import { useState } from "react"
import dayjs from "dayjs"
import { pb } from "../pocketbase/pocketbase"
import { NavLink, useNavigate } from "react-router-dom"

interface form {
	name: string,
	cake: string,
	date: string,
	photo: File | string
}

function BirthdayForm() {
	const [formState, setFormState] = useState<form>({
		name: '',
		cake: '',
		date: '',
		photo: ''
	})
	const navigate = useNavigate()

	const formData = new FormData()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		formData.append('name', formState.name)
		formData.append('cake', formState.cake)
		formData.append('date', dayjs(formState.date).toISOString())
		formData.append('photo', formState.photo)
		await pb.collection('birthdays').create(formData)
		navigate('/')
	}

	function onInputChange({target}: {target: HTMLInputElement}) {
		setFormState({
			...formState,
			[target.name]: target.value
		})
	}

	function onFileSubmit({target}: {target: HTMLInputElement}) {
		formData.delete('photo')
		for(let file of target.files!) {
			setFormState({
				...formState,
				photo: file
			})
		}
	}

	return (
		<div className="container">
			<form className="birthdayForm" onSubmit={handleSubmit}>
				<h1>Añadir cumpleaños</h1>
				<label htmlFor="photo">Fotografía</label>
				<input type="file" id="photo" name="photo" required onChange={onFileSubmit}/>
				<label htmlFor="name">Nombre</label>
				<input type="text" id="name" name="name" required onChange={onInputChange}/>
				<label htmlFor="cake">Pastel favorito</label>
				<input type="text" id="cake" name="cake" required onChange={onInputChange}/>
				<label htmlFor="date">Fecha de nacimiento</label>
				<input type="date" id="date" name="date" required onChange={onInputChange}/>
				<div className="buttons">
					<NavLink className="button button_cancel" to="/">Cancelar</NavLink>
					<button className="button" type="submit">Añadir</button>
				</div>
			</form>
		</div>
	)
}

export default BirthdayForm
