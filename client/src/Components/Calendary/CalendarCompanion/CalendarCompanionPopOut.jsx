import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionPopOut.module.css";
import {
  postAssignSupervisorShift,
  postAssignCompanionShift,
} from "../../../Redux/Actions/postPutActions";
import Swal from 'sweetalert2'

const CalendarPopOut = (props) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const handleConfirm = () => {
    Swal.fire({
      title: "¿Estás seguro que quieres confirmar el turno?",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user.rol === "Companion1" || user.rol === "Companion2") {
          dispatch(
            postAssignCompanionShift(
              user.id,
              props.shift.id.toString(),
              user.rol
            )
          );
        } else if (user.rol === "Supervisor" || user.rol === "SuperAdmin") {
          dispatch(
            postAssignSupervisorShift(
              user.id,
              props.shift.id.toString(),
              user.rol
            )
          );
        }
        props.setTrigger();
      } else {
        props.setTrigger();
      }
    });
  };

  return props.trigger ? (
    <div onClick={() => props.setTrigger()} className={s.popOut}>
      <div className={s.innerPop}>
        {props.children}
        <button onClick={() => handleConfirm()}>Confirma tu turno !</button>
        <button onClick={() => props.setTrigger()}>Cancelar</button>
      </div>
    </div>
  ) : (
    ""
  );
};
export default CalendarPopOut;
