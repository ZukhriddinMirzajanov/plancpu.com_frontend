import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/LoginPage";
import RegisterPage from "./pages/registerPage/RegisterPage";
import HomePage from "./pages/homePage/HomePage";
import Backlogg from "./pages/backLogg/Backlogg";
import TaskManagment from "./pages/taskManagment/TaskManagment";
import UserManagment from "./pages/userManagment/UserManagment";
import EmployeeManagment from "./pages/employeeManagment/EmployeeManagment";
import Account from "./pages/account/Account";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/backlog" element={<Backlogg />} />
        <Route path="/taskManagment" element={<TaskManagment/>} />
        <Route path="/userManagment" element={<UserManagment/>} />
        <Route path="/employeeManagment" element={<EmployeeManagment/>} />
        <Route path="/account" element={<Account/>} />
      </Routes>
    </>
  );
}

export default App;
