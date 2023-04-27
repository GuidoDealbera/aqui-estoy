import React, { useState } from 'react';
import { connect } from 'react-redux';
import CreateUser from './superAdminComponents/CreateUser';
import CsvImportExport from './superAdminComponents/CsvImportExport';
import AssignShifts from './superAdminComponents/AssignShifts';
import GeneralSettings from './superAdminComponents/GeneralSettings'

// Importar las acciones relevantes
import { LOGOUT } from '../../../Redux/Actions/action-types';
import { loginSuccess, loginFail } from '../../../Redux/Actions/actions';

//La función SuperAdmin es un componente de React que devuelve JSX, que es una sintaxis de marcado similar a HTML, pero que permite incluir código JavaScript dentro de ella. Este componente tiene un estado interno activeTab que se utiliza para determinar qué contenido se muestra en la pantalla. La función renderTabContent utiliza el valor de activeTab para devolver el componente correspondiente a la pestaña activa.

const SuperAdmin = (props) => {
    const [activeTab, setActiveTab] = useState('createUser');

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

    return (
        <div className="super-admin">
            <div className="tabs">
                <button onClick={() => setActiveTab('createUser')}>Crear Usuario</button>
                <button onClick={() => setActiveTab('csvImportExport')}>Importar/Exportar CSV</button>
                <button onClick={() => setActiveTab('assignShifts')}>Asignar Turnos</button>
                <button onClick={() => setActiveTab('generalSettings')}>Configuración General</button>
            </div>
            <div className="tab-content">
                {renderTabContent()}
            </div>
        </div>
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

      //El código final exporta el componente SuperAdmin y lo conecta con Redux usando las funciones mapStateToProps y mapDispatchToProps. mapStateToProps se utiliza para mapear el estado de Redux a las propiedades del componente, mientras que mapDispatchToProps se utiliza para mapear las acciones de Redux a las propiedades del componente. Esto permite que el componente acceda al estado y las acciones de Redux.