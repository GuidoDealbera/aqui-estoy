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
import EditInfo from "./Views/Register/EditInfo";
import PasswordRecovery from "./Components/LoginForm/PasswordRecovery";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllCompanionShift,
  getAllCompanions,
  getAllSupervisorShift,
  getAllSupervisors,
} from "./Redux/Actions/viewActions";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

//axios.defaults.baseURL = 'aquiestoyapi-production.up.railway.app';
// axios.defaults.baseURL = 'http://localhost:3001';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();

//   if (isAuthenticated) {
//     return <Route {...rest} element={<Element />} />;
//   } else {
//     return <Navigate to="/" state={{ from: rest.location }} />;
//   }
// };
// const { user } = useSelector((state) => state.auth);

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
  }, [user]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/password-recovery" element={<PasswordRecovery />} />
        <Route element={<RequireAuth />}>
          <Route path="/register" element={<Register />} />
          <Route path="/calendarSuperAdmin" element={<CalendarSuperAdmin />} />
          <Route path="/calendarCompanion" element={<CalendarCompanion />} />
          <Route path="/profile/:id" element={<Profiles />} />
          <Route path="/panel-supervision" element={<PanelSupervision />} />
          <Route
            path="/companionsAtCharge"
            element={<CompanionsAtCharge />}
          ></Route>
          <Route path="/profile/:id/view" element={<ViewProfile />} />
          <Route path="/profile/:id/edit" element={<EditInfo />} />
        </Route>
      </Routes>
      {location.pathname === "/" && <Footer />}
    </div>
  );
};

export default App;

// En la función PrivateRoute, se define un componente que acepta una prop llamada element que se utilizará como componente de ruta protegida. Además, se utiliza useSelector de Redux para obtener el estado de autenticación y useNavigate para navegar a otras rutas.

// En el cuerpo de la función PrivateRoute, se comprueba si el usuario está autenticado y se devuelve una Route que contiene el componente Element si lo está. Si no está autenticado, se utiliza el componente Navigate para redirigir al usuario a la página de inicio.

// En la función App, se utilizan las rutas definidas con Route y se pasan como propiedades path y element. Las rutas "/private" y "/protected" utilizan PrivateRoute como componente de ruta protegida y se le pasa el componente correspondiente (ProtectedPage) como element.

// En resumen, este código define un componente PrivateRoute que se utiliza como componente de ruta protegida en Routes y utiliza Redux para controlar el estado de autenticación. Si el usuario no está autenticado, se redirige a la página de inicio con Navigate.
