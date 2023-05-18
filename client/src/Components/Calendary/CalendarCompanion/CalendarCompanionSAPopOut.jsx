import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionSAPopOut.module.css";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, Button, TextField, Box, Typography } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";


const CalendarSuperAdminPopOut = (props) => {
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { togglePopOut, setTogglePopOut } = props;


  const handleDeleteCompanion = (companionId, shiftId) => {
    dispatch(deleteCompanionShift(companionId, shiftId));    
    // Cerrar el pop-out después de eliminar el companion
    setTogglePopOut(false);
  };
  return props.trigger ? (
    <Box className={s.popOut} onClick={() => setTogglePopOut(false)}>
      <Box className={s.innerPop}>
       
        <Box>
         {props.shift.shiftCompanions?.length ? (
    <Box>
      <Typography variant="h6">Asignados en este turno:</Typography>
      {props.shift.shiftCompanions?.map((companion) => (
     <Box sx={{display:"flex", alignItems: "center", justifyContent: "space-between"}}>
     <Typography variant="p" sx={{fontFamily: "poppins", color: "grey", margin: "1%"}}
          key={companion.id}
          onClick={(e) => {
            navigate(`/profile/${companion.id}/view`);
          }}
        >
          {companion.name} 
        </Typography>
        { (companion.rol === "Companion1" || companion.rol === "Companion2") &&
          <Button onClick={() => handleDeleteCompanion(companion.id, props.shift.originalShift.shiftId)}   style={{
            backgroundColor: "grey",
            color: "white",
            fontSize: "12px",
            padding: "2px 5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px"
          }}>Borrar</Button>
          }
        </Box>

      ))}
    </Box>
  ) : (
    ''
  )}
        </Box>
        <Box sx={{display: "flex", justifyContent: "center", marginTop: "30px"}}>
       <Button variant="contained" onClick={() => props.setTrigger()}>Aceptar</Button>
       </Box>
      </Box>
    </Box>
  ) : null;
};

export default CalendarSuperAdminPopOut;
