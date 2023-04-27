import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateUser from './superAdminComponents/CreateUser';
import CsvImportExport from './superAdminComponents/CsvImportExport';
import AssignShifts from './superAdminComponents/AssignShifts';
import GeneralSettings from './superAdminComponents/GeneralSettings';
import { Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Importar las acciones relevantes
import { LOGOUT } from '../../../Redux/Actions/action-types';
import { loginSuccess, loginFail } from '../../../Redux/Actions/actions';

const SuperAdmin = (props) => {
  const [activeTab, setActiveTab] = useState('createUser');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const renderTabs = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: isMobile ? 'wrap' : 'nowrap',
        gap: isMobile ? '10px' : '0',
      }}
    >
      <Button variant="outlined" onClick={() => setActiveTab('createUser')}>
        Crear Usuario
      </Button>
      <Button variant="outlined" onClick={() => setActiveTab('csvImportExport')}>
        Importar/Exportar CSV
      </Button>
      <Button variant="outlined" onClick={() => setActiveTab('assignShifts')}>
        Asignar Turnos
      </Button>
      <Button variant="outlined" onClick={() => setActiveTab('generalSettings')}>
        Configuración General
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px',
      }}
    >
      {renderTabs()}
      <Box sx={{ width: '100%', marginTop: '20px' }}>{renderTabContent()}</Box>
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
