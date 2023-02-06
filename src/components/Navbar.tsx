import { NavLink, useMatch } from "react-router-dom"

function Navbar() {
	const matches = useMatch('/new')

	return (
		<div className="container">
			<div className="navbar">
				<h1>Retro Off</h1>
				{!matches &&
					<NavLink to="/new" className="button">Nuevo</NavLink>
				}
			</div>	
		</div>
	)
}

export default Navbar
