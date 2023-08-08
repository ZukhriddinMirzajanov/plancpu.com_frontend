import { Outlet, Navigate} from "react-router-dom";

const PrivateRoutes = () => {
    let auth = JSON.parse(localStorage.getItem("user"));
    if (auth != null) {
        return (
            auth.token ? <Outlet/> : <Navigate to="/login"/>
        )
    } else {
        return <Navigate to={"/login"}/>
    }
    
}

export default PrivateRoutes