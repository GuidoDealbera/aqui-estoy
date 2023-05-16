import { Modal, Box, Typography, InputLabel, Button } from "@mui/material";
import CalendarSuperAdminPopOut from './CalendarSuperAdminPopOut';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteSupervisorShift } from "../../../Redux/Actions/postPutActions";


export default function CalendarSAModal ({trigger, setTrigger, shift}){
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
          <Box>
            <Typography variant="h5">
              Asignados en este turno:
            </Typography>
            {shift.shiftSupervisors?.map((supervisor) => (
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} key={supervisor.id}>
                <Typography variant="p" sx={{fontFamily: "poppins", color: "grey"}} onClick={() => navigate(`/profile/${supervisor.id}/view`)}>
                  {supervisor.name}
                </Typography>
              <Box>
                { user.rol === "SuperAdmin" && 
                 <Button  sx={{
                  
                  // fontSize: "12px",
                   padding: 0,
                  // border: "none",
                  // cursor: "pointer",
                  margin: "5px",
                  marginLeft: "10px"
                }}
                        variant="contained"
                        onClick={() =>{
                          handleDeleteSupervisor(supervisor.id, shift.originalShift.shiftId)}
                        }
                      >
                        Borrar
                      </Button>
                }
                </Box>
               
              </Box>
            ))}
          </Box>
        ) : (
          ""
        )}
     {user.rol === "SuperAdmin" && (
  <Box>
    <Typography variant="h5">Nuevo turno a asignar:</Typography>
    <InputLabel sx={{padding: 2}}>{shift.day}</InputLabel>
    <Typography variant="p" sx={{fontFamily: "poppins", padding: 2}}>{shift.time}</Typography>
  </Box>
)}

       
      </CalendarSuperAdminPopOut>
          </Box>
        </Modal>
      
    );
}