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
      title: "¿Confirmas tu turno?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const action = user.rol === "Supervisor" || user.rol === "SuperAdmin" ? postAssignSupervisorShift : postAssignCompanionShift;
        dispatch(action(user.id, props.shift.id.toString(), user.rol));
        props.setTrigger();
      } else {
        props.setTrigger();
      }
    });
  };

  return props.trigger && (
    <div onClick={props.setTrigger} className={s.popOut}>
      <div className={s.innerPop}>
        {props.children}
        <button onClick={handleConfirm} className={s.confirmButton}>Confirmar turno</button>
        <button onClick={props.setTrigger} className={s.cancelButton}>Cancelar</button>
      </div>
    </div>
  );
};

export default CalendarPopOut;
