import React from 'react';
import image from '../../img/xd.png';
import { Link, useLocation } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../Redux/Actions/viewActions';
import { toast } from 'sonner';
import { toastWarning } from '../../Redux/Actions/alertStyle';
import ModalLogin from '../VentanaLogin/ModalLogin';

const NavButton = (props) => (
  <Button
    {...props}
    sx={{
      color: 'inherit',
      textTransform: 'none',
      fontWeight: 'bold',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: '#008000', // Verde fuerte
      },
    }}
  />
);

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
  if(user.rol==="Companion"||user.isSuperCompanion){
    navigate("/calendarCompanion")
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
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Link to="/">
              <CardMedia
                component="img"
                style={{ height: '20%', width: '20%' }}
                image={image}
                alt="aquiEstoy"
              />
            </Link>
          </Grid>
          <Grid item>
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
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                  <MenuItem
                    name="about"
                    onClick={() => handleMenuItemClick('about')}
                  >
                    Acerca de
                  </MenuItem>
                  <MenuItem
                    name="calendar"
                    onClick={() => handleMenuItemClick('calendar')}
                  >
                    Calendario
                  </MenuItem>
                </Menu>
              </Hidden>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              {location.pathname !== `/profile/${id}` && (
                <NavButton name="session" onClick={handleMouseEnter}>
                  {Object.entries(user).length === 0 ? 'Iniciar sesión' : 'Perfil'}
                </NavButton>
              )}
              {location.pathname !== '/' && (
                <NavButton variant="text" name="logout" onClick={closeSession}>
                  Cerrar Sesión
                </NavButton>
              )}
              {showLogin && <ModalLogin handleMouseLeave={handleMouseLeave} showLogin={showLogin} setShowLogin={setShowLogin} />}
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}