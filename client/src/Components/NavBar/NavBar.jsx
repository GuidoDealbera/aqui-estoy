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
  Divider,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../Redux/Actions/viewActions";
import { toast } from "sonner";
import { toastWarning } from "../../Redux/Actions/alertStyle";
import ModalLogin from "../Modals/ModalLogin";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupsIcon from "@mui/icons-material/Groups";
import PowerInputIcon from "@mui/icons-material/PowerInput";
import LogoutIcon from "@mui/icons-material/Logout";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    [theme.breakpoints.down("xl")]: { marginRight: "10px" },
    [theme.breakpoints.up("xl")]: { marginRight: "87px" },
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
      color: "rgb(25, 21, 78)",
      textTransform: "none",
      fontWeight: "bold",
      //position: "relative",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      },
    }}
  />
);

export default function NavBar(props) {
  const theme = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { id } = user;
  const location = useLocation();
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setShowLogin(true);
  };
  const handleMouseLeave = () => {
    setShowLogin(false);
  };
  useEffect(() => {
    setOpen(false);
  }, [user]);
  const handleClick = (event) => {
    if (Object.entries(user).length === 0) {
      toast.error(
        "Debes iniciar sesion para acceder al calendario",
        toastWarning
      );
    }
    if (user.rol === "SuperAdmin" || user.rol === "Supervisor") {
      navigate("/calendarSuperAdmin");
    } else if (user.rol === "Companion1" || user.rol === "Companion2") {
      navigate("/calendarCompanion");
    } else {
      toast.error("No tienes acceso a este calendario", toastWarning);
    }
    setOpen(false)
  };
  const handleClick2 = (event) => {
    if (Object.entries(user).length === 0) {
      toast.error(
        "Debes iniciar sesion para acceder al calendario",
        toastWarning
      );
    }
    if (user.rol === "SuperAdmin" || user.rol === "Supervisor") {
      navigate("/calendarCompanion");
    }
    setOpen(false)
  };
  const handleClickPanel = (event) => {
    if (user.rol === "SuperAdmin" || user.rol === "Supervisor") {
      navigate("/panel-supervision");
    }
    setOpen(false)
  };
  const handleClickCargo = (event) => {
    if (user.rol === "SuperAdmin" || user.rol === "Supervisor") {
      navigate("/CompanionsAtCharge");
    }
    setOpen(false)
  };
  const closeSession = () => {
    dispatch(logOut());
    navigate("/");
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const handleMenuItemClick = (name) => {
    handleMenuClose();
    // ...
  };
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#fff", width: "100vw" }}
      elevation={0}
    >
      <Toolbar sx={{ boxShadow: "0 0 5px black" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={7} md={10} xl={11}>
            <Link to="/">
              <CardMedia
                component="img"
                style={{ minWidth: "140px", maxWidth: "250px", margin: 0 }}
                image={image}
                alt="aquiEstoy"
              />
            </Link>
          </Grid>
          <Grid
            item
            xs={5}
            md={2}
            xl={1}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box>
              {location.pathname === "/" &&
                Object.entries(user).length === 0 && (
                  <NavButton name="session" onClick={handleMouseEnter}>
                    Iniciar Sesión
                  </NavButton>
                )}
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
                    aria-controls={open ? "profile-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleMenuClick}
                    alt={user.name}
                    src={user.profilePhoto}
                    sx={{
                      [theme.breakpoints.down("xl")]: { marginRight: "10px" },
                      [theme.breakpoints.up("xl")]: { marginRight: "100px" },
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
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={() => {navigate(`/profile/${id}`); setOpen(false)}}>
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText>Perfil</ListItemText>
                    </MenuItem>
                    {(user.rol === "SuperAdmin" || user.rol === "Supervisor") && (
                      <Box>
                      <MenuItem onClick={handleClick}>
                        <ListItemIcon>
                          <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText>Calendario Supervisores</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClick2}>
                        <ListItemIcon>
                          <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText>Calendario Acompañantes</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClickCargo}>
                        <ListItemIcon>
                          <GroupsIcon />
                        </ListItemIcon>
                        <ListItemText>Acompañantes a mi cargo</ListItemText>
                      </MenuItem>
                      <MenuItem onClick={handleClickPanel}>
                        <ListItemIcon>
                          <PowerInputIcon />
                        </ListItemIcon>
                        <ListItemText>Panel de supervisión</ListItemText>
                      </MenuItem>
                      </Box>)}
                    {(user.rol === "Companion1" ||
                      user.rol === "Companion2") && (
                      <MenuItem onClick={handleClick}>
                        <ListItemIcon>
                          <CalendarMonthIcon />
                        </ListItemIcon>
                        <ListItemText>Calendario</ListItemText>
                      </MenuItem>
                    )}
                    <Divider />
                    <MenuItem onClick={closeSession}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText>Cerrar Sesión</ListItemText>
                    </MenuItem>
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
