import { useDispatch, useSelector } from "react-redux";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const PopOut = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 24,
  borderRadius: '12px',
  padding: '20px',
}));

const InnerPop = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const CalendarSuperAdminPopOut = (props) => {
  const {shift, trigger, setTrigger} = props;
  const [supervisorId, setSupervisorId] = useState({
    name: "",
    id: ""
  });
  const { user } = useSelector((state) => state.auth);
  let supervisors = useSelector((state) => state.view.allSupervisors);
  supervisors = supervisors.filter((sup) => sup.name && sup.lastName && sup.isActive)
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
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsConfirmed(true);
        if (user.rol === "SuperAdmin") {
          dispatch(postAssignSupervisorShift(supervisorId.id, props.shift.originalShift.shiftId.toString(), user.rol));
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

  return trigger ? (
    <PopOut>
      <InnerPop>
        {props.children}
        {user.rol === "SuperAdmin" && shift.maxSupervisors > shift.supervisorCount &&
          <div>
            <Autocomplete
              disablePortal
              id="combo-box"
              options={supervisors}
              onChange={handleChange}
              sx={{ width: "270px" }}
              renderInput={(params) => <TextField {...params} label="Selecciona un supervisor" />}
              isOptionEqualToValue={isOptionEqualToValue}
            />
          </div>
        }
        {user.rol === "SuperAdmin" && shift.maxSupervisors > shift.supervisorCount ? (
          <Box sx={{ marginTop: 2.5, padding: 1, width: "270px", display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => {
              handleConfirm()
              setTrigger(false)
            }}
            >
              Confirmar
            </Button>

            <Button variant="contained" color="error" sx={{ width: "114px" }} onClick={() => setTrigger()}>Cerrar</Button>
          </Box>
        ) : (
          <Box sx={{ marginTop: 2.5, padding: 1, width: "270px", display: "flex", flexDirection: "column", textAlign: "center" }}>
            <Box>
            <ErrorOutlineIcon color="error" sx={{fontSize: "50px", display: shift.supervisorCount === 0 ? null : "none"}}/>
            <Typography variant="h6" sx={{display: shift.supervisorCount === 0 ? null : "none"}}>Este turno no está disponible</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "center", marginTop: "10%"}}>
            <Button variant="contained" color="primary" sx={{ width: "114px" }} onClick={() => setTrigger()}>Aceptar</Button>
            </Box>
          </Box>
        )}
      </InnerPop>
    </PopOut>
  ) : null;
};

export default CalendarSuperAdminPopOut;
