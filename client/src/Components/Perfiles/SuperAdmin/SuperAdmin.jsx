import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateUser from './superAdminComponents/CreateUser';
import CsvImportExport from './superAdminComponents/CsvImportExport';
import AssignSupervisor from './superAdminComponents/AssignSupervisor';
import GeneralSettings from './superAdminComponents/GeneralSettings';
import UsersViewEdit from './superAdminComponents/UsersViewEdit';
import SuperAdminDatos from './SuperAdminDatos';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, IconButton, Tab, Tabs, Hidden, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
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
    <Box sx={{display: "flex", justifyContent: "center"}}>
    <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons>
      <Tab value="profile" label="Perfil" />
      <Tab value="createUser" label="Crear Usuario" />
      <Tab value="usersViewEdit" label="Ver/Editar Usuarios" />
      <Tab value="csvImportExport" label="Importar/Exportar CSV" />
      <Tab value="assignSupervisor" label="Asignar Referente" />
      <Tab value="generalSettings" label="Configuración General" />
    </Tabs>
    </Box>
  );

  return (
    <Box className="super-admin">
      <Hidden smDown>{renderTabs()}</Hidden>
      <Hidden smUp>
        <IconButton onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'profile')}>
            <ListItemIcon>
              <AccountBoxIcon/>
            </ListItemIcon>
            <ListItemText>Perfil</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'createUser')}>
            <ListItemIcon>
              <AddBoxIcon/>  
            </ListItemIcon>
            <ListItemText>Crear Usuario</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'usersViewEdit')}>
          <ListItemIcon>
              <AppRegistrationIcon/>  
            </ListItemIcon>
            <ListItemText>Ver/Editar Usuarios</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'csvImportExport')}>
          <ListItemIcon>
              <ImportExportIcon/>  
            </ListItemIcon>
            <ListItemText>Importar/Exportar CSV</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'assignSupervisor')}>
          <ListItemIcon>
              <SupervisorAccountIcon/>  
            </ListItemIcon>
            <ListItemText>Asignar Referente</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'generalSettings')}>
          <ListItemIcon>
              <SettingsIcon/>  
            </ListItemIcon>
            <ListItemText>Configuración General</ListItemText>
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
    loginSuccess: (userData) => dispatch(loginSuccess(userData)),
    loginFail: (error) => dispatch(loginFail(error)),
    logout: () => dispatch({ type: LOGOUT }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdmin);