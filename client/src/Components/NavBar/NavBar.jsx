import image from "../../img/aquiestoy(bien).jpg";
import { Link, useLocation } from "react-router-dom";
import LoginForm from "../LoginForm/LoginForm";
import { useState } from "react";
import {
  CardMedia,
  Box,
  Button,
  Grid,
  Hidden,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/viewActions";
import { toast } from "sonner";
import { toastWarning } from "../../Redux/Actions/alertStyle";

export default function NavBar(props) {
  const {user} = useSelector((state) => state.auth);
  const {id} = user;
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowLogin(true);
  };
  const handleMouseLeave = () => {
    setShowLogin(false);
  };
  const handleClick = (event) => {
  if(Object.entries(user).length === 0){
  toast.error("Debes iniciar sesion para acceder al calendario", toastWarning)
  }
  if(user.rol==="Supervisor"||user.rol==="SuperAdmin"){
    navigate("/calendarSupervisor")
  }

  
  };
  const closeSession = () => {
    dispatch(logOut());
    navigate('/');
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (name) => {
    handleMenuClose();
    // ...
  };

  return (
    <Box
      sx={{
        background: "#C8CCD8",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box>
            <Hidden smDown>
              {/* <Button variant="text" name="about" onClick={handleClick}>
                Acerca de
              </Button> */}
              <Button variant="text" name="calendar" onClick={handleClick}>
                Calendario
              </Button>
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem
                  name="about"
                  onClick={() => handleMenuItemClick("about")}
                >
                  Acerca de
                </MenuItem>
                <MenuItem
                  name="calendar"
                  onClick={() => handleMenuItemClick("calendar")}
                >
                  Calendario
                </MenuItem>
              </Menu>
            </Hidden>
          </Box>
        </Grid>
        <Grid item>
          <Link to="/">
            <Box  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CardMedia
            component="img"
            style={{ height: "20%", width: "20%" }}
            image={image}
            alt="aquiEstoy"
          />
            </Box>
          </Link>
        </Grid>
        <Grid item>
          <Box>
            {location.pathname !== `/profile/${id}` && (
              <Button name="session" onClick={handleMouseEnter}>
              {Object.entries(user).length === 0?"Iniciar sesión":"Perfil"}
              </Button>
            )}
            {location.pathname !== '/' && <Button variant="text" name="logout" onClick={closeSession}>
                Cerrar Sesión
              </Button>}
            {showLogin && <LoginForm handleMouseLeave={handleMouseLeave} />}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
