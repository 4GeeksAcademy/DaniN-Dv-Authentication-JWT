import { Link, NavLink } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer()

	const logout = () => {
		dispatch({ type: "SET_TOKEN", payload: null })
		localStorage.removeItem("token")
		localStorage.removeItem("user")
	}

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

			<div className="container-fluid">

				<a className="navbar-brand" href="#">My Page</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<NavLink className={({ isActive }) => `nav-link active ${isActive ? "border-bottom" : ""}`} to="/">Home</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className={({ isActive }) => `nav-link active ${isActive ? "border-bottom" : ""}`} to="/tasks">Tasks</NavLink>
						</li>
						{
							store.token ? (
								<li className="nav-item dropdown">
									<a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										User
									</a>
									<ul className="dropdown-menu dropdown-menu-end">
										<li><Link className="dropdown-item" to="/profile">Profile</Link></li>
										<li><a className="dropdown-item text-danger" href="#" onClick={() => logout()}>Close session</a></li>
									</ul>
								</li>

							) : (
								<div className="d-flex">

									<li className="nav-item">
										<NavLink className={({ isActive }) => `nav-link active ${isActive ? "border-bottom" : ""}`} to="/login">Login</NavLink>
									</li>
								</div>

							)
						}
					</ul>
				</div>
			</div>
		</nav>
	);
};