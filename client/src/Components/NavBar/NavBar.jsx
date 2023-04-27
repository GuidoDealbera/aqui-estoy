import image from "../../img/aquiestoy.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
// import styles from "./NavBar.module.css";
import { CardMedia } from "@mui/material";

export default function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const handleMouseEnter = () => {
    setShowLogin(true)
  };
  const handleMouseLeave = () => {
    setShowLogin(false)
  }
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
      <CardMedia
      component="img"
      height="auto"
      image={image}
      alt="aquiEstoy"
    />
      {/* <img src={image} alt="aquiEstoy" /> */}
      {location.pathname !== "/profile/Chiringuito" && (
        <button
          name="session"
          onMouseEnter={handleMouseEnter}
        >
          Iniciar sesión
        </button>
      )}
      {showLogin && <LoginForm handleMouseLeave={handleMouseLeave}/>}
      {location.pathname !== "/profile/Chiringuito" && (
        <button name="register" onClick={handleClick}>
          Registrate
        </button>
      )}
    </div>
  );
}
