import { Modal, Box, Typography, InputLabel, Button, Divider } from "@mui/material";
import CalendarSuperAdminPopOut from './CalendarSuperAdminPopOut';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSupervisorShift } from "../../../Redux/Actions/postPutActions";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";


export default function CalendarSAModal({ trigger, setTrigger, shift }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteSupervisor = (supervisorId, shiftId) => {
    dispatch(deleteSupervisorShift(supervisorId, shiftId));
    // Cerrar el pop-out después de eliminar el supervisor
    setTrigger(false);
  };
  return (

    <Modal
      open={trigger}
      onClose={() => setTrigger(false)}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <CalendarSuperAdminPopOut
          shift={shift}
          setTrigger={setTrigger}
          trigger={trigger}
        >
          {shift.shiftSupervisors?.length ? (
            <Box sx={{width:"270px"}}>
              <Typography sx={{fontSize:"21px"}}>
                Asignados en este turno
              </Typography>
              <Box sx={{maxHeight:"120px", overflow:"auto"}}>
              {shift.shiftSupervisors?.map((supervisor) => (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "270px" }} key={supervisor.id}>
                  <Typography variant="h6" sx={{ fontFamily: "poppins", color: "grey" }} onClick={() => navigate(`/profile/${supervisor.id}/view`)}>
                    {supervisor.name} {supervisor.lastName}
                  </Typography>
                  <Box>
                    {user.rol === "SuperAdmin" &&
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: '¿Estás seguro que quieres eliminar el turno del supervisor seleccionado?',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmar',
                            cancelButtonText: 'Cancelar',
                            customClass: {
                              container: 'swal2-container'
                            }
                          }).then((result) => {
                            if (result.isConfirmed) {
                              if (user.rol === "SuperAdmin") {
                                handleDeleteSupervisor(supervisor.id, shift.originalShift.shiftId)
                              }
                            } else {
                            }
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </Box>
                </Box>
              ))}
              </Box>
            </Box>
          ) : (
            ""
          )}
          {user.rol === "SuperAdmin" && shift.maxSupervisors > shift.supervisorCount && (
            <Box sx={{ width: "270px" }}>
              <Typography sx={{fontSize:"21px"}}>Nuevo turno a asignar:</Typography>
              <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"5px", marginBottom:"5px"}}>
                <InputLabel sx={{paddingTop:"8px"}}>{shift.day}</InputLabel>
                <Typography sx={{padding:"8px", paddingRight:"0px"}}>{shift.time}</Typography>
              </Box>
            </Box>
          )}
        </CalendarSuperAdminPopOut>
      </Box>
    </Modal>

  );
}