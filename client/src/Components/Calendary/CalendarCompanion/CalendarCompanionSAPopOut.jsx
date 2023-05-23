import { useDispatch, useSelector } from "react-redux";
import s from "./CalendarCompanionSAPopOut.module.css";
import { postAssignCompanionShiftSA } from "../../../Redux/Actions/postPutActions";
import { Autocomplete, Button, TextField, Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";
import { getAllCompanionsPerShift } from "../../../Redux/Actions/viewActions";
import {  InputLabel } from "@mui/material";
import { styled } from '@mui/material/styles';
import { toast } from "sonner";
import { toastWarning } from "../../../Redux/Actions/alertStyle";

const CalendarSuperAdminPopOut = (props) => {


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shift, togglePopOut, setTogglePopOut } = props;
  const [companionId, setCompanionId] = useState({
    name: "",
    id: ""
  });
  let companions = useSelector((state) => state.view.allCompanions);
  const { user } = useSelector((state) => state.auth);
 
  companions = companions.filter((com) => com.name && com.lastName && com.isActive)
 
  companions = companions.map((companion) => ({
    id: companion.id,
    label: `${companion.name} ${companion.lastName}`,
    rol: companion.rol,
    CompanionShifts: companion.CompanionShifts
  })).filter((companion) => companion.label.trim() !== "");
 
 

  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if(companionId.id){
    Swal.fire({
      title: '¿Estás seguro que quieres confirmar el turno?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsConfirmed(true);
            
          let findComp = companions.find((c)=> companionId.name === c.label)
  
          if(findComp.rol !== 'Companion1' || findComp.CompanionShifts === 0){
            dispatch(postAssignCompanionShiftSA(companionId.id, props.shift.originalShift.shiftId.toString(), user.rol));
            } else{
              toast.error('Este acompañante no puede tener más de un turno',toastWarning)
            }
          
          props.setTrigger();        
      } 
    });
  }else {
    toast.error("Seleccione un acompañante", toastWarning)
  }
  };

  const isOptionEqualToValue = (option, value) => option.id === value.id && option.label === value.label;

  const handleChange = (event, value) => {
    if (value) {
      setCompanionId({
        name: value.label,
        id: value.id
      });
    } else {
      setCompanionId({
        name: "",
        id: ""
      });
    }
  };
  useEffect(() => {
    dispatch(getAllCompanionsPerShift());
  }, [togglePopOut]);

  const InnerPop = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }));

  const handleAutocompleteClick = (e) => {
    e.stopPropagation();
  };

  const handleDeleteCompanion = (companionId, shiftId) => {
    dispatch(deleteCompanionShift(companionId, shiftId));
    // Cerrar el pop-out después de eliminar el companion
    setTogglePopOut(false);
  };
  const handlePopOut = () => {
    setTogglePopOut(false);
    setCompanionId({
      name: "",
      id: ""
    });
  }
  return props.trigger ? (
    <Box className={s.popOut} onClick={handlePopOut}>
      <Box className={s.innerPop}>

        <Box>
          {props.shift.shiftCompanions?.length ? (
            <Box>
              <Typography variant="h6">Asignados en este turno:</Typography>
              <Box sx={{overflow: "auto", maxHeight:"200px"}}>
                {props.shift.shiftCompanions?.map((companion) => (
                  <Box key={companion.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "260px" }}>
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
        {shift.maxCompanions > shift.companionCount && 
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        <Box sx={{ width: "270px" }}>
              <Typography sx={{fontSize:"21px"}}>Nuevo turno a asignar:</Typography>
              <Box sx={{display:"flex", justifyContent:"space-between", marginTop:"5px", marginBottom:"5px"}}>
                <InputLabel sx={{paddingTop:"8px"}}>{props.shift.day}</InputLabel>
                <Typography sx={{padding:"8px", paddingRight:"0px"}}>{props.shift.time}</Typography>
              </Box>
            </Box>
        </Box> 
          }
        
        {shift.maxCompanions > shift.companionCount ? 
        <InnerPop>
        {props.children}
      
          <div onClick={handleAutocompleteClick}>
            <Autocomplete
              disablePortal
              id="combo-box"
              options={["Selecciona un acompañante" ,...companions]}
              value={companionId.name}
              onChange={handleChange}
              sx={{ width: "270px" }}
              renderInput={(params) => <TextField {...params} label="Selecciona" />}
              isOptionEqualToValue={isOptionEqualToValue}
            />
          </div>
        
        
          <Box sx={{ marginTop: 2.5, padding: 1, width: "270px", display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => {
              handleConfirm()
              props.setTrigger(false)
            }}
            >
              Confirmar
            </Button>

            <Button variant="contained" color="error" sx={{ width: "114px" }} onClick={() => props.setTrigger()}>Cerrar</Button>
          </Box>
       
      </InnerPop>

:  (
  <Box sx={{ marginTop: 2.5, padding: 1, width: "270px", display: "flex", flexDirection: "column", textAlign: "center" }}>
    <Box>
    <ErrorOutlineIcon color="error" sx={{fontSize: "50px", display: shift.companionCount === 0 ? null : "none"}}/>
    <Typography variant="h6" sx={{display: shift.companionCount === 0 ? null : "none"}}>Este turno no está disponible</Typography>
    </Box>
    <Box sx={{display: "flex", justifyContent: "center", marginTop: "10%"}}>
    <Button variant="contained" color="primary" sx={{ width: "114px" }} onClick={() => props.setTrigger()}>Aceptar</Button>
    </Box>
  </Box>
)
}
      </Box>
    </Box>
  ) : null;
};

export default CalendarSuperAdminPopOut;
