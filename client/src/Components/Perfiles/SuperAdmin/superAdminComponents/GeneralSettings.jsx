import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Select, Typography, MenuItem, Button, Switch, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { putSpecificCompanionShift, putGeneralCompanionShift, putGeneralSupervisorShift, putSpecificSupervisorShift } from "../../../../Redux/Actions/postPutActions";
import { toast } from "sonner";
import { toastWarning } from "../../../../Redux/Actions/alertStyle";
import SpecialShifts from "./SpecialShifts";
import TimezoneMiddlewareSettings from "./TimezoneMiddlewareSettings";
import TimezoneMiddlewareCompanion from "./TimezoneMiddlewareCompanion";
import TimezoneMiddlewareSupervisor from "./TimezoneMiddlewareSupervisor";

const StyledInputContainer = styled("div")(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledLabel = styled("h3")(({ theme }) => ({
  fontWeight: "bold",
}));

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const GeneralSettings = () => {

  const user = useSelector(state => state.auth.user)

  const dispatch = useDispatch();
  const companionShifts = useSelector((state) => state.view.companionsPerShift);
  companionShifts.sort((a, b) => a.id - b.id);
  // Datos de ejemplo, reemplaza esto con las configuraciones reales de tu aplicación
  const [toggle, setToggle] = useState(false);
  const [maxCompanions, setMaxCompanions] = useState({
    max: 0,
    startTime: "",
    endTime: "",
  });
  const [specificMaxCompanions, setSpecificMaxCompanions] = useState({
    day: 0,
    hour: "",
    max: 0,
  });
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  const handleMaxCompanionsChange = (event) => {
    const { name, value } = event.target;
    setMaxCompanions({
      ...maxCompanions,
      [name]: value,
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
  const handleSpecificCompanionSubmit = async (event) => {
    event.preventDefault();
    if (specificMaxCompanions.hour !== "") {
      const result = companionShifts.find((shift) => shift.time === specificMaxCompanions.hour && shift.day === parseInt(specificMaxCompanions.day))
      const parsedShift = TimezoneMiddlewareCompanion([result], user.CityTimeZone.offSet)
      const { day, time } = parsedShift[0];
      const newTime = {
        day,
        hour: time,
        max: specificMaxCompanions.max
      }
      dispatch(putSpecificCompanionShift(newTime));
      setSpecificMaxCompanions({
        day: "",
        hour: "",
        max: 0,
      });
    } else {
      toast.error("Debe seleccionar un horario", toastWarning);
    }
  };
  const handleGeneralCompanionSubmit = (event) => {
    event.preventDefault();
    if (maxCompanions.max >= 0) {
      if (maxCompanions.endTime !== '' && maxCompanions.startTime !== '') {
        const parsedResult = TimezoneMiddlewareSettings(maxCompanions, user.CityTimeZone.offSet, 'Companion');
        console.log(parsedResult);
        if (parsedResult.endTime === "01:00") {
          parsedResult.endTime === "25:00"
        }
        dispatch(putGeneralCompanionShift(parsedResult));
      } else {
        dispatch(putGeneralCompanionShift(maxCompanions));
      }
      setMaxCompanions({
        endTime: '',
        startTime: '',
        max: 0
      });
    } else {
      toast.error("El máximo no puede ser menor a 0", toastWarning);
    }
  };
  //Codigo para vista de supervisores
  const supervisorShifts = useSelector((state) => state.view.supervisorsPerShift);
  supervisorShifts.sort((a, b) => a.id - b.id);

  const [maxSupervisors, setMaxSupervisors] = useState({
    max: 0,
    startTime: "",
    endTime: "",
  });
  const [specificMaxSupervisors, setSpecificMaxSupervisors] = useState({
    day: 0,
    hour: "",
    max: 0,
  });

  const handleMaxSupervisorsChange = (event) => {
    const { name, value } = event.target;
    setMaxSupervisors({
      ...maxSupervisors,
      [name]: value,
    });
    // agregar el código para actualizar la configuración en tu base de datos o estado de Redux
  };

  const handleSpecificMaxSupervisorsChange = (event) => {
    const { name, value } = event.target;
    setSpecificMaxSupervisors({
      ...specificMaxSupervisors,
      [name]: value,
    });
  };
  const handleSpecificSupervisorSubmit = (event) => {
    event.preventDefault();
    if (specificMaxSupervisors.hour !== "") {
      const result = supervisorShifts.find((shift) => shift.time === specificMaxSupervisors.hour && shift.day === parseInt(specificMaxSupervisors.day))
      const parsedShift = TimezoneMiddlewareSupervisor([result], user.CityTimeZone.offSet)
      const { day, time } = parsedShift[0];
      const newTime = {
        day,
        hour: time,
        max: specificMaxSupervisors.max
      }
      dispatch(putSpecificSupervisorShift(newTime));
      setSpecificMaxSupervisors({
        day: "",
        hour: "",
        max: 0,
      });
    } else {
      toast.error("Debe seleccionar un horario", toastWarning);
    }
  };
  const handleGeneralSupervisorSubmit = (event) => {
    event.preventDefault();
    if (maxSupervisors.max >= 0) {
      if (maxSupervisors.endTime !== '' && maxSupervisors.startTime !== '') {
        const parsedResult = TimezoneMiddlewareSettings(maxSupervisors, user.CityTimeZone.offSet, 'Supervisor');
        dispatch(putGeneralSupervisorShift(parsedResult));
      } else {
        dispatch(putGeneralSupervisorShift(maxSupervisors));
      }
      setMaxSupervisors({
        endTime: '',
        startTime: '',
        max: 0
      });
    } else {
      toast.error("El máximo no puede ser menor a 0", toastWarning);
    }
  };
  //Fin vista supervisores
  //  agregar el código para actualizar la configuración en tu base de datos o estado de Redux

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: "20px" }}>
          <Typography>Acompañantes</Typography>
          <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={toggle} onChange={toggleHandler} />
          <Typography>Supervisores</Typography>
        </Stack>
      </Box>
      {toggle ? (
        <Box>
          <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
            Configuración General Turnos de Supervisores
          </Typography>
          <Box sx={{ margin: "25vw", marginTop: 5 }}>
            <StyledInputContainer>
              <Typography variant="h6">
                Número máximo de SUPERVISORES por turno
              </Typography>
              <TextField
                type="number"
                name="max"
                value={maxSupervisors.max}
                onChange={handleMaxSupervisorsChange}
                fullWidth
              />
              <div>
                <label>
                  <Typography variant="h6">Desde:</Typography>
                  <Select
                    name="startTime"
                    value={maxSupervisors.startTime}
                    onChange={handleMaxSupervisorsChange}
                    fullWidth
                  >
                    {supervisorShifts
                      .sort((a, b) => a.id - b.id)
                      .map((shift) => {
                        if (shift.day == specificMaxSupervisors.day) {
                          return (
                            <MenuItem
                              key={shift.id}
                              value={shift.time.split("-")[0]}
                            >
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
                    value={maxSupervisors.endTime}
                    onChange={handleMaxSupervisorsChange}
                    fullWidth
                  >
                    {supervisorShifts
                      .sort((a, b) => a.id - b.id)
                      .map((shift) => {
                        if (shift.day == specificMaxSupervisors.day) {
                          let newtime;
                          if (shift.time.split("-")[1] === "00:00") {
                            newtime = "24:00"
                          } else {
                            newtime = shift.time.split("-")[1]
                          }
                          if (maxSupervisors.startTime < newtime) {

                            return (
                              <MenuItem
                                key={shift.id}
                                value={newtime}
                              >
                                {newtime}
                              </MenuItem>
                            );
                          }
                        }
                      })}
                  </Select>
                </label>
              </div>
              <Button variant="contained" sx={{ marginTop: "10px" }} onClick={handleGeneralSupervisorSubmit}>Guardar</Button>
            </StyledInputContainer>
            <StyledInputContainer>
              <Typography variant="h6">
                Número máximo de SUPERVISORES en un turno específico
              </Typography>
              <div>
                <label>
                  <Typography variant="h6">Día:</Typography>
                  <Select
                    name="day"
                    value={specificMaxSupervisors.day}
                    onChange={handleSpecificMaxSupervisorsChange}
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
                    value={specificMaxSupervisors.hour}
                    onChange={handleSpecificMaxSupervisorsChange}
                    fullWidth
                  >
                    {supervisorShifts
                      .sort((a, b) => a.id - b.id)
                      .map((shift) => {
                        if (shift.day == specificMaxSupervisors.day) {
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
                    value={specificMaxSupervisors.max}
                    onChange={handleSpecificMaxSupervisorsChange}
                    fullWidth
                  />
                </label>
              </div>
              <Button variant="contained" sx={{ marginTop: "10px" }} onClick={handleSpecificSupervisorSubmit}>Guardar</Button>
            </StyledInputContainer>
            <Box>
              <SpecialShifts rol={'Supervisor'} />
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
            Configuración General Turnos de Acompañantes
          </Typography>
          <Box sx={{ margin: "25vw", marginTop: 5 }}>
            <StyledInputContainer>
              <Typography variant="h6">
                Número máximo de ACOMPAÑANTES por turno
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
                            <MenuItem
                              key={shift.id}
                              value={shift.time.split("-")[0]}
                            >
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
                          let newtime;
                          if (shift.time.split("-")[1] === "00:00") {
                            newtime = "24:00"
                          } else {
                            newtime = shift.time.split("-")[1]
                          }

                          if (maxCompanions.startTime < newtime) {
                            return (
                              <MenuItem
                                key={shift.id}
                                value={newtime}
                              >
                                {newtime}
                              </MenuItem>
                            );
                          } else {
                            if (shift.time.split("-")[1] === "01:00") {
                              newtime = "25:00"
                            }
                            if (newtime === "25:00") {
                              return (
                                <MenuItem
                                  key={shift.id}
                                  value="01:00"
                                >
                                  {"01:00"}
                                </MenuItem>
                              );
                            }
                          }
                        }
                      })}
                  </Select>
                </label>
              </div>
              <Button variant="contained" sx={{ marginTop: "10px" }} onClick={handleGeneralCompanionSubmit}>Guardar</Button>
            </StyledInputContainer>
            <StyledInputContainer>
              <Typography variant="h6">
                Número máximo de ACOMPAÑANTES en un turno específico
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
              <Button variant="contained" sx={{ marginTop: "10px" }} onClick={handleSpecificCompanionSubmit}>Guardar</Button>
            </StyledInputContainer>
            <Box>
              <SpecialShifts rol={'Companion'} />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GeneralSettings;
