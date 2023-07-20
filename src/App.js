import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import HomePage from "./pages/homePage/HomePage";
import Backlogg from "./pages/backLogg/Backlogg";
import EmployeeManagement from "./pages/employeeManagement/EmployeeManagement";
import Account from "./pages/account/Account";
import TaskManagement from "./pages/taskManagement/TaskManagement";
import UserManagement from "./pages/userManagement/UserManagement";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/backlog" element={<Backlogg />} />
        <Route path="/taskManagement" element={<TaskManagement/>} />
        <Route path="/userManagement" element={<UserManagement/>} />
        <Route path="/employeeManagement" element={<EmployeeManagement/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
    </>
  );
}

export default App;
