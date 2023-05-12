import { useDispatch, useSelector } from "react-redux";
import {
  postAssignSupervisorShift,
  postAssignCompanionShift,
} from "../../../Redux/Actions/postPutActions";
import Swal from 'sweetalert2'
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useEffect, useState } from "react";

const CalendarPopOut = (props) => {
  const [open, setOpen] = useState(props.trigger);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.trigger);
  }, [props.trigger]);

  const handleConfirm = () => {
    Swal.fire({
      title: "¿Confirmas tu turno?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const action = user.rol === "Supervisor" || user.rol === "SuperAdmin" ? postAssignSupervisorShift : postAssignCompanionShift;
        dispatch(action(user.id, props.shift.id.toString(), user.rol)).then(() => {
          props.setTrigger(false);
          setOpen(false);
        });
      } else {
        props.setTrigger(false);
        setOpen(false);
      }
    });
  };

  return (
    <Dialog open={open} onClose={() => {props.setTrigger(false); setOpen(false);}}>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
      <Button className="confirmButton" onClick={handleConfirm} variant="contained" color="primary">
  Confirmar turno
</Button>
<Button className="cancelButton" onClick={() => {props.setTrigger(false); setOpen(false);}} variant="outlined" color="secondary">
  Cancelar
</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CalendarPopOut;