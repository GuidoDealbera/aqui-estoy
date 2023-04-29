import {Routes, Route} from 'react-router-dom';
import Profiles from './Views/Profiles/Profiles';
import Landing from './Views/LandingPage/Landing';
import NavBar from './Components/NavBar/NavBar';

import Register from './Views/Register/Register';
import SuperAdmin from './Components/Perfiles/SuperAdmin/SuperAdmin'; //Dev import
import Calendary from './Components/Calendary/CompanionCalendary';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const navigate = useNavigate();

//   if (isAuthenticated) {
//     return <Route {...rest} element={<Element />} />;
//   } else {
//     return <Navigate to="/" state={{ from: rest.location }} />;
//   }
// };

const App = () => {
  return (
    <div>
      <NavBar/> 
    <Routes>
      <Route exact path='/' element={<Landing/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/Calendary' element={<Calendary/>}/>
      <Route path='/profile/:id' element={<Profiles/>}/>
      <Route exact path='/superadmindev' element={<SuperAdmin/>}/>



    </Routes>
    </div>
  );
};

export default App;


// En la función PrivateRoute, se define un componente que acepta una prop llamada element que se utilizará como componente de ruta protegida. Además, se utiliza useSelector de Redux para obtener el estado de autenticación y useNavigate para navegar a otras rutas.

// En el cuerpo de la función PrivateRoute, se comprueba si el usuario está autenticado y se devuelve una Route que contiene el componente Element si lo está. Si no está autenticado, se utiliza el componente Navigate para redirigir al usuario a la página de inicio.

// En la función App, se utilizan las rutas definidas con Route y se pasan como propiedades path y element. Las rutas "/private" y "/protected" utilizan PrivateRoute como componente de ruta protegida y se le pasa el componente correspondiente (ProtectedPage) como element.

// En resumen, este código define un componente PrivateRoute que se utiliza como componente de ruta protegida en Routes y utiliza Redux para controlar el estado de autenticación. Si el usuario no está autenticado, se redirige a la página de inicio con Navigate.






