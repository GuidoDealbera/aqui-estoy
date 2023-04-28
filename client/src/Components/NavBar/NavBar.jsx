import image from "../../img/aquiestoy.jpg";
import { useNavigate, useLocation } from "react-router-dom";
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
// import MenuIcon from "@material-ui/icons/Menu";

export default function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = () => {
    setShowLogin(true);
  };
  const handleMouseLeave = () => {
    setShowLogin(false);
  };
  const handleClick = (event) => {
    // ...
  };

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
        background: "#F6F6F6",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box>
            <Hidden smDown>
              <Button variant="text" name="about" onClick={handleClick}>
                Acerca de
              </Button>
              <Button variant="text" name="calendar" onClick={handleClick}>
                Calendario
              </Button>
            </Hidden>
            <Hidden mdUp>
              <IconButton onClick={handleMenuClick}>
                {/* <MenuIcon /> */}
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
          <CardMedia
            component="img"
            style={{ height: "20%", width: "20%" }}
            image={image}
            alt="aquiEstoy"
          />
        </Grid>
        <Grid item>
          <Box>
            {location.pathname !== "/profile/Chiringuito" && (
              <Button name="session" onClick={handleMouseEnter}>
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
        </Grid>
      </Grid>
    </Box>
  );
}
