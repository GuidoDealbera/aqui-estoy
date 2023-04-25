import image from "../../img/aquiestoy.jpg";
import { useNavigate } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";

export default function NavBar(props) {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const handleFormClick = (event) => {
    setShowLogin(!showLogin)
  };
  window.addEventListener('click', (event) => {
    if(event.target.name !== 'session') setShowLogin(false)})
  const handleClick = (event) => {
    //const { name } = event.target;
    // switch (name) {
    //   case "about":
    //      navigate("/about");
    //      break;
    //   case "calendar":
    //      navigate("/calendar");
    //      break;
    //   case "register":
    //      navigate("/register");
    //      break;
    //   default:
    //      navigate("/");
    //      break;
    // }
  };
  return (
    <div>
      <button name="about" onClick={handleClick}>
        Acerca de
      </button>
      <button name="calendar" onClick={handleClick}>
        Calendario
      </button>
      <img src={image} alt="aquiEstoy" />
      <button name='session' onClick={handleFormClick}>
        Iniciar sesión
      </button>
      {showLogin && <LoginForm/>}
      <button name="register" onClick={handleClick}>
        Registrate
      </button>
    </div>
  );
}
