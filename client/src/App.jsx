import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import Profiles from "./Views/Profiles/Profiles";
import Landing from "./Views/LandingPage/Landing";
import NavBar from "./Components/NavBar/NavBar";
import Register from "./Views/Register/Register";
import CalendarSuperAdmin from "./Components/Calendary/CalendarSuperAdmin/CalendarSuperAdmin";
import Footer from "./Components/Footer/Footer";
import PanelSupervision from "./Views/PanelSupervision/PanelSupervision";
import axios from "axios";
import CalendarCompanion from "./Components/Calendary/CalendarCompanion/CalendarCompanion";
import CompanionsAtCharge from "./Components/Cards/CompanionsAtCharge";
import ViewProfile from "./Components/ViewProfile/ViewProfile";
import PasswordRecovery from "./Components/LoginForm/PasswordRecovery";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCompanionShift,
  getAllCompanions,
  getAllCompanionsPerShift,
  getAllSupervisorShift,
  getAllSupervisors,
  getAllSupervisorsPerShift,
} from "./Redux/Actions/viewActions";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const location = useLocation();
  const RequireAuth = () => {
    return user ? <Outlet /> : <Navigate to={"/"} />;
  };
  useEffect(() => {
    dispatch(getAllCompanions());
    dispatch(getAllSupervisors());
    dispatch(getAllCompanionShift());
    dispatch(getAllSupervisorShift());
    dispatch(getAllSupervisorShift());
    dispatch(getAllSupervisorsPerShift());
    dispatch(getAllCompanionsPerShift());
  }, [dispatch, user]);
  return (
    <div>
      <NavBar />
      <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
          <Route element={<RequireAuth />}>
          <Route path="/register" element={<Register />} />
          <Route path="/CompanionsAtCharge" element={<CompanionsAtCharge />} />
          <Route path="/profile/:id" element={<Profiles />} />
          <Route path="/panel-supervision" element={<PanelSupervision />} />
          <Route path="/calendarSuperAdmin" element={<CalendarSuperAdmin />} />
          <Route path= "/calendarCompanion" element={<CalendarCompanion/>}/>
          <Route path="/profile/:id/view" element={<ViewProfile />} />
        </Route>
      </Routes>
      {location.pathname === "/" && <Footer />}
    </div>
  );
};
export default App;

