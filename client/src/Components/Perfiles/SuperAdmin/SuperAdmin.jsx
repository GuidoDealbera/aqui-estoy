import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateUser from './superAdminComponents/CreateUser';
import CsvImportExport from './superAdminComponents/CsvImportExport';
import AssignSupervisor from './superAdminComponents/AssignSupervisor';
import GeneralSettings from './superAdminComponents/GeneralSettings';
import UsersViewEdit from './superAdminComponents/UsersViewEdit';
import SuperAdminDatos from './SuperAdminDatos';
// Importar componentes y utilidades de MUI
import { Box, Button, IconButton, Tab, Tabs, Hidden, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


const SuperAdmin = (props) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'createUser':
        return <CreateUser />;
      case 'profile':
        return <SuperAdminDatos user={props.user}/>;
      case 'usersViewEdit':
        return <UsersViewEdit /> 
      case 'csvImportExport':
        return <CsvImportExport />;
      case 'assignSupervisor':
        return <AssignSupervisor />;
      case 'generalSettings':
        return <GeneralSettings />;
      default:
        return <CreateUser />;
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleMenuItemClick = (event, newValue) => {
    setActiveTab(newValue);
    handleMenuClose();
  };

  const renderTabs = () => (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tab value="profile" label="Perfil" />
      <Tab value="createUser" label="Crear Usuario" />
      <Tab value="usersViewEdit" label="Ver/Editar Usuarios" />
      <Tab value="csvImportExport" label="Importar/Exportar CSV" />
      <Tab value="assignSupervisor" label="Asignar Referente" />
      <Tab value="generalSettings" label="Configuración General" />
    </Tabs>
  );

  return (
    <Box className="super-admin">
      <Hidden smDown>{renderTabs()}</Hidden>
      <Hidden mdUp>
        <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'profile')}>
            Perfil
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'createUser')}>
            Crear Usuario
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'usersViewEdit')}>
            Ver o Editar Usuarios
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'csvImportExport')}>
            Importar/Exportar CSV
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'assignSupervisor')}>
            Asignar Referente
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'generalSettings')}>
            Configuración General
          </MenuItem>
        </Menu>
      </Hidden>
      <Box className="tab-content">{renderTabContent()}</Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Mapea las acciones relevantes al componente
    loginSuccess: (userData) => dispatch(loginSuccess(userData)),
    loginFail: (error) => dispatch(loginFail(error)),
    logout: () => dispatch({ type: LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);
