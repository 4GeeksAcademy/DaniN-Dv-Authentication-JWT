import useGlobalReducer from "../hooks/useGlobalReducer"

export const Tasks = () => {

    const {store} = useGlobalReducer()

    return (
        <h1 className="text-center mt-4">Here are your tasks {store.user.lastname}</h1>
    )
}