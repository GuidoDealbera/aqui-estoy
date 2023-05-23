import { useDispatch, useSelector } from "react-redux";
import {
  postAssignSupervisorShift,
  postAssignCompanionShift,
} from "../../../Redux/Actions/postPutActions";
import Swal from 'sweetalert2'
import { Box, Button, Typography, Dialog, DialogContent, DialogActions } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useEffect, useState } from "react";

const CalendarPopOut = (props) => {
  const {shift} = props;
  const [open, setOpen] = useState(props.trigger);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setOpen(props.trigger);
  }, [props.trigger]);

  const handleConfirm = () => {
    props.setTrigger(false);
    Swal.fire({
      title: "¿Confirmas tu turno?",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const action = user.rol === "Supervisor" || user.rol === "SuperAdmin" ? postAssignSupervisorShift : postAssignCompanionShift;
        dispatch(action(user.id, props.shift.originalShift.shiftId.toString(), user.rol)).then(() => {
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
      {shift.maxCompanions > shift.companionCount ? (
        <Box>
      <DialogContent>
        <Typography variant="p" sx={{fontFamily: "poppins"}}>
        {props.children}
        </Typography>
      </DialogContent>
      <DialogActions>
      <Button className="confirmButton" onClick={handleConfirm} variant="contained" color="primary">
  Ok
</Button>
<Button className="cancelButton" onClick={() => {props.setTrigger(false); setOpen(false);}} variant="outlined" color="secondary">
  Cancelar
</Button>
      </DialogActions> </Box>) : (
        <Box>
      <DialogContent>
        <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <ErrorOutlineIcon color="error" sx={{fontSize: "50px"}}/>
        <Typography variant="h5" sx={{marginTop: "3%"}}>
        Este turno no está disponible
        </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{justifyContent: "center"}}>
        <Button className="cancelButton" onClick={() => {props.setTrigger(false); setOpen(false);}} variant="contained" color="primary">
            Aceptar
        </Button>
      </DialogActions>
      </Box>)}
    </Dialog>
  );
};

export default CalendarPopOut;