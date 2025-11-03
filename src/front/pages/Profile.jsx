import useGlobalReducer from "../hooks/useGlobalReducer"

export const Profile = () => {
    const { store } = useGlobalReducer()

    return (
        <div className="container vh-100 d-flex flex-column">
           <div className="row justify-content-center">
            <h1 className="text-center my-5">Welcome back {store.user.lastname}!</h1>
            <h2 className="mb-3">Your user information:</h2>
            <h4 className="ms-5">Your email: {store.user.email}</h4>
            <h4 className="ms-5">Your name: {store.user.lastname}</h4>
            <h4 className="ms-5">Your ID: {store.user.id}</h4>
           </div>
        </div>
    )
}