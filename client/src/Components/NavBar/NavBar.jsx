import image from "../../img/aquiestoy.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
// import styles from "./NavBar.module.css";
import { CardMedia, Box, Button } from "@mui/material";


export default function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const handleMouseEnter = () => {
    setShowLogin(true);
  };
  const handleMouseLeave = () => {
    setShowLogin(false);
  };
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
    <Box
      sx={{
        background: "#F6F6F6",
        display: "flex",
      }}
      justifyContent="space-between" alignItems="center"
    >
      <Button variant="text" name="about" onClick={handleClick} >
        Acerca de
      </Button>
      <Button variant="text" name="calendar" onClick={handleClick}>
        Calendario
      </Button>
      <CardMedia component="img" style={{ height: '20%', width: '20%' }}  image={image} alt="aquiEstoy" />

      {location.pathname !== "/profile/Chiringuito" && (
        <Button name="session" onMouseEnter={handleMouseEnter}>
          Iniciar sesión
        </Button>
      )}
      {showLogin && <LoginForm handleMouseLeave={handleMouseLeave} />}
      {location.pathname !== "/profile/Chiringuito" && (
        <Button name="register" onClick={handleClick}>
          Registrate
        </Button>
      )}
    </Box>
  );
}
