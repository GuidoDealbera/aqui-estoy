import { useDispatch, useSelector } from "react-redux";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, TextField, Button } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

const PopOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  borderRadius: '12px',
  padding: '40px',
}));

const InnerPop = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CalendarSuperAdminPopOut = (props) => {
  const [supervisorId, setSupervisorId] = useState({
    name: "",
    id: ""
  });
  const { user } = useSelector((state) => state.auth);
  let supervisors = useSelector((state) => state.view.allSupervisors);
  supervisors = supervisors.map((supervisor) => ({
    id: supervisor.id,
    label: `${supervisor.name} ${supervisor.lastName}`
  })).filter((supervisor) => supervisor.label.trim() !== "");
  const dispatch = useDispatch();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres confirmar el turno?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsConfirmed(true);
        if (user.rol === "SuperAdmin") {
          dispatch(postAssignSupervisorShift(supervisorId.id, props.shift.shiftId.toString(), user.rol));
        }
        props.setTrigger();
      } else {
        props.setTrigger();
      }
    });
  };

  const isOptionEqualToValue = (option, value) => option.id === value.id && option.label === value.label;

  const handleChange = (e, value) => {
    setSupervisorId({
      name: value.label,
      id: value.id
    });
  };

  return props.trigger ? (
    <PopOut>
      <InnerPop>
      {props.children}
        { user.rol === "SuperAdmin" &&
        <div>              
          <Autocomplete
            disablePortal
            id="combo-box"
            options={supervisors}
            onChange={handleChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Selecciona un supervisor" />}
            isOptionEqualToValue={isOptionEqualToValue}
          />
          <h3>{`Para: ${supervisorId.name}`}</h3>
          <Button variant="contained" color="primary" onClick={() => handleConfirm()}>Confirma el turno !</Button>
          
          </div>
        }  
        <Button variant="contained" color="secondary" onClick={() => props.setTrigger()}>Cancelar</Button>    
      </InnerPop>
    </PopOut>
  ) : null;
};

export default CalendarSuperAdminPopOut;
