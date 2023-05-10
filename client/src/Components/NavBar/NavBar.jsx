import React, { useEffect } from "react";
import image from "../../img/xd.png";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
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
  AppBar,
  Toolbar,
  Avatar,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/viewActions";
import { toast } from "sonner";
import { toastWarning } from "../../Redux/Actions/alertStyle";
import ModalLogin from "../VentanaLogin/ModalLogin";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 1px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
    },
  },
}));
const NavButton = (props) => (
  <Button
    {...props}
    sx={{
      color: "inherit",
      textTransform: "none",
      fontWeight: "bold",
      position: "relative",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        color: "rgb(25, 21, 78)", // Verde fuerte
      },
    }}
  />
);

export default function NavBar(props) {
  const { user } = useSelector((state) => state.auth);
  const { id } = user;
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setShowLogin(true);
  };
  const handleMouseLeave = () => {
    setShowLogin(false);
  };
  useEffect(() => {
    setOpen(false)
  }, [user])
  const handleClick = (event) => {
    if (Object.entries(user).length === 0) {
      toast.error(
        "Debes iniciar sesion para acceder al calendario",
        toastWarning
      );
    }
    if (user.rol === "SuperAdmin") {
      navigate("/calendarSuperAdmin");
    } else if (user.rol === "Companion1" || user.rol === "Companion2") {
      navigate("/calendarCompanion");
    } else {
      toast.error("No tienes acceso a este calendario", toastWarning);
    }
  };
  const closeSession = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false)
  };

  const handleMenuItemClick = (name) => {
    handleMenuClose();
    // ...
  };
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={11}>
            <Link to="/">
              <CardMedia
                component="img"
                style={{ height: "20%", width: "20%" }}
                image={image}
                alt="aquiEstoy"
              />
            </Link>
          </Grid>
          {/* <Grid item>
            <Box display="flex">
               <Hidden smDown>
                <NavButton variant="text" name="calendar" onClick={handleClick}>
                  Calendario
                </NavButton>
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
          </Grid> */}
          <Grid item xs={1}>
            <Box>
              {location.pathname === "/" &&
                Object.entries(user).length === 0 && (
                  <NavButton name="session" onClick={handleMouseEnter}>
                    Iniciar Sesión
                  </NavButton>
                )}
              {/* {location.pathname !== "/" && (
                <NavButton variant="text" name="logout" onClick={closeSession}>
                  Cerrar Sesión
                </NavButton>
              )} */}
              {showLogin && (
                <ModalLogin
                  handleMouseLeave={handleMouseLeave}
                  showLogin={showLogin}
                  setShowLogin={setShowLogin}
                />
              )}
              {Object.entries(user).length > 0 && (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    id="profile-button"
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuClick}
                    alt={user.name}
                    src={user.profilePhoto}
                    sx={{
                      "&:hover": {
                        cursor: "pointer",
                        boxShadow: "0 0 3px rgb(25, 21, 78)",
                      },
                    }}
                  />
                  <Menu
                    id="profile-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": "profile-button",
                    }}
                  >
                    <MenuItem onClick={() => navigate(`/profile/${id}`)}>Perfil</MenuItem>
                    {user.rol !== 'Supervisor' && <MenuItem onClick={handleClick}>Calendario</MenuItem>}
                    <MenuItem onClick={closeSession}>Cerrar Sesión</MenuItem>
                  </Menu>
                </StyledBadge>
              )}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
