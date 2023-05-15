import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionSAPopOut.module.css";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";


const CalendarSuperAdminPopOut = (props) => {
 /* const [supervisorId, setSupervisorId] = useState({
    name: "",
    id: ""
  });
  const { user } = useSelector((state) => state.auth);
  let supervisors = useSelector((state) => state.view.allSupervisors);
  supervisors = supervisors.map((supervisor) => ({
    id: supervisor.id,
    label: `${supervisor.name} ${supervisor.lastName}`
  })).filter((supervisor) => supervisor.label.trim() !== ""); */
  
  
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { togglePopOut, setTogglePopOut } = props;

  const handleConfirm = () => {
    Swal.fire({
      title: '¿Estás seguro que quieres confirmar el turno?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
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
        { companion.rol === "Companion1" &&
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

      {/*
        {props.children}
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
        <button onClick={() => handleConfirm()}>Confirma el turno !</button>*/}
        <p>Nota: Solo puede eliminar los turnos de Acompañantes nivel 1</p>
       <button onClick={() => props.setTrigger()}>Cancelar</button>
       
      </div>
    </div>
  ) : null;
};

export default CalendarSuperAdminPopOut;
