import { useState } from "react"
import { useNavigate } from "react-router-dom"

const initialUser = {
    lastname: "",
    email: "",
    password: ""
}

const url = import.meta.env.VITE_BACKEND_URL

export const Register = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState(initialUser)

    const handleChange = ({ target }) => {
        setUser({
            ...user,
            [target.name]: target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        try {

            const response = await fetch(`${url}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })

            if (response.ok) {
                alert("Registered successfully")
    
                setUser(initialUser)
                navigate("/login")
            }
            
        } catch (error) {

            if (response.status == 409) {
                alert("This user already exist")
            } else {
                alert("An error occurred while registering the user.")
            }
            
        }
        

    }

    return (
        <div className="container vh-100 d-flex flex-column mt-5">
            <div className="row justify-content-center">
                <h1 className="text-center mb-4">Register</h1>
                <div className="col-12 col-md-6">
                    <form
                        className="border-top border-bottom border-secondary p-5"
                        onSubmit={handleSubmit}
                    >
                        <div className="form-group mb-3">
                            <label htmlFor="forName" className="form-label">Full Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="forName"
                                placeholder="Daniel Novas"
                                name="lastname"
                                onChange={handleChange}
                                value={user.lastname}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="forEmail">Email:</label>
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
                                placeholder="************"
                                name="password"
                                accept="/image/*"
                                onChange={handleChange}
                                value={user.password}
                            />
                        </div>
                        <button className="btn btn-outline-primary col-12">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}