import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateUser from './superAdminComponents/CreateUser';
import CsvImportExport from './superAdminComponents/CsvImportExport';
import AssignShifts from './superAdminComponents/AssignShifts';
import GeneralSettings from './superAdminComponents/GeneralSettings';

// Importar componentes y utilidades de MUI
import { Box, Button, IconButton, Tab, Tabs, Hidden, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const SuperAdmin = (props) => {
  const [activeTab, setActiveTab] = useState('createUser');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'createUser':
        return <CreateUser />;
      case 'csvImportExport':
        return <CsvImportExport />;
      case 'assignShifts':
        return <AssignShifts />;
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
      <Tab value="createUser" label="Crear Usuario" />
      <Tab value="csvImportExport" label="Importar/Exportar CSV" />
      <Tab value="assignShifts" label="Asignar Turnos" />
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
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'createUser')}>
            Crear Usuario
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'csvImportExport')}>
            Importar/Exportar CSV
          </MenuItem>
          <MenuItem onClick={(event) => handleMenuItemClick(event, 'assignShifts')}>
            Asignar Turnos
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
