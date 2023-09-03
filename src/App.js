import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import HomePage from "./pages/homePage/HomePage";
import Backlogg from "./pages/backLogg/Backlogg";
import EmployeeManagement from "./pages/employeeManagement/EmployeeManagement";
import TaskManagement from "./pages/taskManagement/TaskManagement";
import UserManagement from "./pages/userManagement/UserManagement";
import AboutPage from "./pages/aboutPage/AboutPage";
import Profile from "./pages/profile/Profile";
import PrivateRoutes from "./utils/PrivateRoutes";
import TimeRegistrationPage from "./pages/timeRegistration/TimeRegistrationPage";
import ProjectManagement from "./pages/projectManagement/ProjectManagment";
import CompanyManagment from "./pages/companyManagment/CompanyManagment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage/>}/>
        <Route element={<PrivateRoutes/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/backlog" element={<Backlogg />} />
            <Route path="/userManagement" element={<UserManagement/>} />
            <Route path="/employeeManagement" element={<EmployeeManagement/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/taskManagement" element={<TaskManagement/>} />
            <Route path="/timeReport" element={<TimeRegistrationPage/>}/>
            <Route path="/projects" element={<ProjectManagement/>}/>
            <Route path="/company" element={<CompanyManagment/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
