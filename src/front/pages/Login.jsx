import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer"

const initialUser = {
    email: "",
    password: ""
}

const url = import.meta.env.VITE_BACKEND_URL

export const Login = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState(initialUser)

    const {store, dispatch} = useGlobalReducer()

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async () => {

        event.preventDefault()

        try {
            const response = await fetch(`${url}/login`, {
                method:"POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            const data = await response.json()

            if(response.ok){
                dispatch({type:"SET_TOKEN", payload: data.token})
                localStorage.setItem("token", data.token)

                setUser(initialUser)
                navigate("/")
            }


        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container vh-100 d-flex flex-column mt-5">
            <div className="row justify-content-center">

                <h1 className="text-center mb-4">Sign in</h1>
                <div className="col-12 col-md-6">
                    <form 
                        className="border-top border-bottom border-secondary p-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label className="form-label" htmlFor="forEmail">Correo:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="forEmail"
                                placeholder="example@email.com"
                                name="email"
                                onChange={handleChange}
                                value={user.email}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forPassword">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="forPassword"
                                placeholder="********"
                                name="password"
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <button className="btn btn-outline-primary col-12">Iniciar</button>
                    </form>
                    <div className="mt-4">
                        <Link className="me-4" to="/register">Register</Link>
                        <Link>Forgot your password</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}