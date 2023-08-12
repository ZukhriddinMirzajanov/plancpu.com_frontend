import { Outlet, Navigate} from "react-router-dom";

const PrivateRoutes = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
        return (
            user.token ? <Outlet/> : <Navigate to="/login"/>
        )
    } else {
        return <Navigate to={"/login"}/>
    }
    
}

export default PrivateRoutes