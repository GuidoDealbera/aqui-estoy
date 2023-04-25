import image from "../../img/aquiestoy.jpg";
import { useNavigate } from "react-router-dom";


export default function NavBar(props) {
    const navigate = useNavigate();
    const handleClick = (event) => {
        // const {name} = event.target
        // switch(name){
        //     case 'about':
        //         return navigate('/about')
        //     case 'calendar':
        //         return navigate('/calendar')
        //     case 'session':
        //         return navigate('/login')
        //     case 'register':
        //         return navigate('/register')
        //     default:
        //         return navigate('/')
        // }
    }
  return (
    <div>
      <button name="about" onClick={handleClick}>Acerca de</button>
      <button name="calendar" onClick={handleClick}>Calendario</button>
      <img src={image} alt="aquiEstoy" />
      <button name="session" onClick={handleClick}>Iniciar sesión</button>
      <button name="register" onClick={handleClick}>Registrate</button>
    </div>
  );
}
