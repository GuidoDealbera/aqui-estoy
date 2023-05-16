import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionSAPopOut.module.css";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, TextField } from "@mui/material";
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
    <div className={s.popOut}>
      <div className={s.innerPop}>
       
        <div>
         {props.shift.shiftCompanions?.length ? (
    <div >
      <h3><b>Asignados en este turno:</b></h3>
      {props.shift.shiftCompanions?.map((companion) => (
     <div style={{display:"flex"}}>
     <p
          key={companion.id}
          onClick={(e) => {
            navigate(`/profile/${companion.id}/view`);
          }}
        >
          {companion.name} 
        </p>
        { (companion.rol === "Companion1" || companion.rol === "Companion2") &&
          <button onClick={() => handleDeleteCompanion(companion.id, props.shift.shiftId)}   style={{
            backgroundColor: "grey",
            color: "white",
            fontSize: "12px",
            padding: "2px 5px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            margin: "10px"
          }}>X</button>
          }
        </div>

      ))}
    </div>
  ) : (
    ''
  )}
        </div>
       <button onClick={() => props.setTrigger()}>Cancelar</button>
       
      </div>
    </div>
  ) : null;
};

export default CalendarSuperAdminPopOut;
