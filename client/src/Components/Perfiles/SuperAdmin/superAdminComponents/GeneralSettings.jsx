import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Select, Typography, MenuItem, Menu, Button, Switch, FormControlLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { putSpecificCompanionShift,putGeneralCompanionShift } from "../../../../Redux/Actions/postPutActions";
import { toast } from "sonner";
import { toastWarning } from "../../../../Redux/Actions/alertStyle";

const StyledInputContainer = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled("h3")(({ theme }) => ({
  fontWeight: "bold",
}));
const GeneralSettings = () => {
  const dispatch = useDispatch();
  const companionShifts = useSelector((state) => state.view.allCompanionShift);
  companionShifts.sort((a, b) => a.id - b.id);
  //const supervisorShifts = useSelector(state => state.view.allSupervisorShift)
  // Datos de ejemplo, reemplaza esto con las configuraciones reales de tu aplicación
  const [toggle, setToggle] = useState(false);
  const [maxCompanions, setMaxCompanions] = useState({
    max:0,
    startTime:"",
    endTime:"",
  });
  const [specificMaxCompanions, setSpecificMaxCompanions] = useState({
    day: 0,
    hour: "",
    max: 0,
  });
const toggleHandler = () => {
  setToggle(!toggle)
}

  const handleMaxCompanionsChange = (event) => {
    const { name , value}= event.target
    setMaxCompanions({
      ...maxCompanions,
      [name]:value,
    });
    // agregar el código para actualizar la configuración en tu base de datos o estado de Redux
  };

  const handleSpecificMaxCompanionsChange = (event) => {
    const { name, value } = event.target;
    setSpecificMaxCompanions({
      ...specificMaxCompanions,
      [name]: value,
    });
  };
  const handleSpecificCompanionSubmit = (event)=>{
    event.preventDefault();
    if(specificMaxCompanions.hour !== ''){
    dispatch(putSpecificCompanionShift(specificMaxCompanions))
    setSpecificMaxCompanions({
      day: '',
      hour: '',
      max: 0,
    })
    }else{
      toast.error("Debe seleccionar un horario", toastWarning)
    }
  }
  const handleGeneralCompanionSubmit = (event)=>{
    event.preventDefault();
    if(maxCompanions.max >= 0){
    dispatch(putGeneralCompanionShift(maxCompanions))
    }else{
      toast.error("El máximo no puede ser menor a 0", toastWarning)
    }
  }
  //  agregar el código para actualizar la configuración en tu base de datos o estado de Redux

  return (
  <>
  <Box sx={{display: "flex", justifyContent: "center"}}>
  <FormControlLabel
    value="end"
    control={<Switch color="primary" checked={toggle} onChange={toggleHandler}/>}
    label={toggle ? 'Supervisores' : 'Acompañantes'}
    labelPlacement="end"
  />
  </Box>
  {toggle ? (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
        Configuración General Supervisores
      </Typography>
      <Box sx={{ margin: "25vw", marginTop: 5 }}>
        <StyledInputContainer>
          <Typography variant="h6">
            Número máximo de acompañantes por turno
          </Typography>
          <TextField
            type="number"
            name="max"
            value={maxCompanions.max}
            onChange={handleMaxCompanionsChange}
            fullWidth
          />
          <div>
            <label>
              <Typography variant="h6">Desde:</Typography>
              <Select
                name="startTime"
                value={maxCompanions.startTime}
                onChange={handleMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time.split("-")[0]}>
                          {shift.time.split("-")[0]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Hasta:</Typography>
              <Select
                name="endTime"
                value={maxCompanions.endTime}
                onChange={handleMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time.split("-")[1]}>
                          {shift.time.split("-")[1]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <Button onClick={handleGeneralCompanionSubmit}>Guardar</Button>
        </StyledInputContainer>
        <StyledInputContainer>
          <Typography variant="h6">
            Número máximo de acompañantes en un turno específico
          </Typography>
          <div>
            <label>
              <Typography variant="h6">Día:</Typography>
              <Select
                name="day"
                value={specificMaxCompanions.day}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              >
                <MenuItem value="0">Lunes</MenuItem>
                <MenuItem value="1">Martes</MenuItem>
                <MenuItem value="2">Miércoles</MenuItem>
                <MenuItem value="3">Jueves</MenuItem>
                <MenuItem value="4">Viernes</MenuItem>
                <MenuItem value="5">Sábado</MenuItem>
                <MenuItem value="6">Domingo</MenuItem>
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Horario:</Typography>
              <Select
                name="hour"
                value={specificMaxCompanions.hour}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time}>
                          {shift.time}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Máximo:</Typography>
              <TextField
                type="number"
                name="max"
                value={specificMaxCompanions.max}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              />
            </label>
          </div>
          <Button onClick={handleSpecificCompanionSubmit}>Guardar</Button>
        </StyledInputContainer>
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
        Configuración General
      </Typography>
      <Box sx={{ margin: "25vw", marginTop: 5 }}>
        <StyledInputContainer>
          <Typography variant="h6">
            Número máximo de acompañantes por turno
          </Typography>
          <TextField
            type="number"
            name="max"
            value={maxCompanions.max}
            onChange={handleMaxCompanionsChange}
            fullWidth
          />
          <div>
            <label>
              <Typography variant="h6">Desde:</Typography>
              <Select
                name="startTime"
                value={maxCompanions.startTime}
                onChange={handleMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time.split("-")[0]}>
                          {shift.time.split("-")[0]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Hasta:</Typography>
              <Select
                name="endTime"
                value={maxCompanions.endTime}
                onChange={handleMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time.split("-")[1]}>
                          {shift.time.split("-")[1]}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <Button onClick={handleGeneralCompanionSubmit}>Guardar</Button>
        </StyledInputContainer>
        <StyledInputContainer>
          <Typography variant="h6">
            Número máximo de acompañantes en un turno específico
          </Typography>
          <div>
            <label>
              <Typography variant="h6">Día:</Typography>
              <Select
                name="day"
                value={specificMaxCompanions.day}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              >
                <MenuItem value="0">Lunes</MenuItem>
                <MenuItem value="1">Martes</MenuItem>
                <MenuItem value="2">Miércoles</MenuItem>
                <MenuItem value="3">Jueves</MenuItem>
                <MenuItem value="4">Viernes</MenuItem>
                <MenuItem value="5">Sábado</MenuItem>
                <MenuItem value="6">Domingo</MenuItem>
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Horario:</Typography>
              <Select
                name="hour"
                value={specificMaxCompanions.hour}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              >
                {companionShifts
                  .sort((a, b) => a.id - b.id)
                  .map((shift) => {
                    if (shift.day == specificMaxCompanions.day) {
                      return (
                        <MenuItem key={shift.id} value={shift.time}>
                          {shift.time}
                        </MenuItem>
                      );
                    }
                  })}
              </Select>
            </label>
          </div>
          <div>
            <label>
              <Typography variant="h6">Máximo:</Typography>
              <TextField
                type="number"
                name="max"
                value={specificMaxCompanions.max}
                onChange={handleSpecificMaxCompanionsChange}
                fullWidth
              />
            </label>
          </div>
          <Button onClick={handleSpecificCompanionSubmit}>Guardar</Button>
        </StyledInputContainer>
      </Box>
    </Box>
  )}</>);
};

export default GeneralSettings;
