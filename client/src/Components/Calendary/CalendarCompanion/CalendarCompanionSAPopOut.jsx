import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionSAPopOut.module.css";
import { postAssignSupervisorShift } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, Button, TextField, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
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
              <Box sx={{overflow: "auto", maxHeight:"200px"}}>
                {props.shift.shiftCompanions?.map((companion) => (
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "260px" }}>
                    <Typography variant="p" sx={{ fontFamily: "poppins", color: "grey", margin: "1%" }}
                      key={companion.id}
                      onClick={(e) => {
                        navigate(`/profile/${companion.id}/view`);
                      }}
                    >
                      {companion.name} {companion.lastName}
                    </Typography>
                    {(companion.rol === "Companion1" || companion.rol === "Companion2") &&
                      <IconButton
                        onClick={() => {
                          Swal.fire({
                            title: '¿Estás seguro que quieres eliminar el turno del acompañante seleccionado?',
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
                              handleDeleteCompanion(companion.id, props.shift.originalShift.shiftId)
                            }
                          });
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  </Box>

                ))}
              </Box>
            </Box>
          ) : (
            ''
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Button variant="contained" onClick={() => props.setTrigger()}>Aceptar</Button>
        </Box>
      </Box>
    </Box>
  ) : null;
};

export default CalendarSuperAdminPopOut;
