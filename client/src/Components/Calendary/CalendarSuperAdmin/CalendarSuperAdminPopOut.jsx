import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarSuperAdminPopOut.module.css";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

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

  return props.trigger ? (
    <div className={s.popOut}>
      <div className={s.innerPop}>
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
        <button onClick={() => handleConfirm()}>Confirma el turno !</button>
        <button onClick={() => props.setTrigger()}>Cancelar</button>
      </div>
    </div>
  ) : null;
};

export default CalendarSuperAdminPopOut;
