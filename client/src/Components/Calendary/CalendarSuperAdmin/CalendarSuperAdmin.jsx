import { useDispatch, useSelector } from "react-redux";
import { getAllSupervisorsPerShift } from "../../../Redux/Actions/viewActions";
import { useEffect, useState } from "react";
import CalendarSAModal from './CalendarSAModal'
import CalendarSuperAdminPopOut from "./CalendarSuperAdminPopOut";
import { useNavigate } from "react-router-dom";
import { deleteSupervisorShift } from "../../../Redux/Actions/postPutActions";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "sonner";
import { toastWarning } from "../../../Redux/Actions/alertStyle";
import TimezoneMiddleware from "./TimezoneMiddleware";

const CalendarSupervisor = () => {
  const [togglePopOut, setTogglePopOut] = useState(false);
  const [shift, setShift] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  // Estado con la totalidad de los turnos, esten asignados o no:
  let unprocessedShifts = useSelector((state) => state.view.supervisorsPerShift);
  let shifts = TimezoneMiddleware(unprocessedShifts, user.CityTimeZone.offSet);

  //Armado de calendario:
  let perShift = shifts.map((shift) => {
    switch (shift.day) {
      case 0:
        return {
          ...shift,
          day: "Lunes",
        };
      case 1:
        return {
          ...shift,
          day: "Martes",
        };
      case 2:
        return {
          ...shift,
          day: "Miercoles",
        };
      case 3:
        return {
          ...shift,
          day: "Jueves",
        };
      case 4:
        return {
          ...shift,
          day: "Viernes",
        };
      case 5:
        return {
          ...shift,
          day: "Sabado",
        };
      case 6:
        return {
          ...shift,
          day: "Domingo",
        };

      default:
        return;
    }
  });
  const days = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  let hours = [];
  if (user && (user.rol === "SuperAdmin" || user.rol === "Supervisor")) {
    hours = Array.from({ length: 24 }, (_, i) => {
      if (i < 9) {
        return `0${i}:00-0${i + 1}:00`;
      }
      if (i === 9) {
        return `0${i}:00-${i + 1}:00`;
      }

      return `${i}:00-${i === 23 ? "00" : i + 1}:00`;
    });
  }
  const handleClickCell = (hour, day) => {
    let found = perShift.find(
      (shift) => shift.time === hour && shift.day === day
    );

    if (found.supervisorCount > 0 && user.rol === 'Supervisor') { setTogglePopOut(!togglePopOut) }
    if (found.supervisorCount === 0 && user.rol === 'Supervisor') toast.error('Para reservar un turno, comunícate con el Administrador', toastWarning)
    if (user.rol === 'SuperAdmin') { setTogglePopOut(!togglePopOut) };
    //Actualizo estado local con 1 shift de onClick:
    setShift(found);
  };

  // const handleDeleteSupervisor = (supervisorId, shiftId) => {
  //   dispatch(deleteSupervisorShift(supervisorId, shiftId));
  //   // Cerrar el pop-out después de eliminar el supervisor
  //   setTogglePopOut(false);
  // };

  useEffect(() => {
    dispatch(getAllSupervisorsPerShift());
  }, [togglePopOut]);

  // Render de cada celda:
  return (
    <Container>
      <Grid
        container
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={1}
        alignItems={"center"}
      >
        <Grid item flex={4} margin={"2vh"}>
          <Button
            variant="contained"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              navigate(-1);
            }}
          >
            Regresar
          </Button>
        </Grid>

        <Grid item flex={8}>
          <Typography display="block" variant="h6" marginLeft={"3vw"}>
            Calendario Supervisor
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="h7"
        sx={{ display: "flex", padding: "10px", fontFamily: "poppins" }}
      >
        Horarios dispuestos en la zona horaria: {user.CityTimeZone.offSet}{" "}
        {user.CityTimeZone.zoneName}
      </Typography>
      <TableContainer component={Paper}>
        <Table border={1} bordercolor={"lightGray"}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {days.map((day, index) => (
                <TableCell key={index}>{day}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {hours.map((hour) => (
              <TableRow key={hour}>
                <TableCell >{hour}</TableCell>
                {days.map((day, index) => {
                  const found = shifts.find(
                    (shift) => shift.day === index && shift.time === hour
                  );
                  const supervisorCount = found ? found.supervisorCount : 0;
                  const maxSupervisors = found ? found.maxSupervisors : 0;
                  let countText = supervisorCount;
                  if (supervisorCount && maxSupervisors) {
                    countText = 'Disponibles:  ' + (maxSupervisors - supervisorCount);
                  }
                  // Determinar color de disponibilidad y estilos en línea
                  let cellStyle = {};
                  if (found) {
                    const availabilityRatio = supervisorCount / maxSupervisors;

                    if (availabilityRatio <= 0.3) {
                      cellStyle.backgroundColor = 'lightgreen'; // Alta disponibilidad
                    }
                    else if (availabilityRatio <= 0.5) {
                      cellStyle.backgroundColor = "#F0F34E"; // Disponibilidad moderada
                    } else if (availabilityRatio == 1) {
                      cellStyle.backgroundColor = "lightgrey";
                      // Sin disponibilidad
                    }
                  }



                  return (
                    <TableCell
                      key={day}
                      onClick={() => handleClickCell(hour, day)}
                      style={cellStyle}
                    >
                      {countText || 'Disponibles: ' + maxSupervisors}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {togglePopOut && <CalendarSAModal
        shift={shift}
        setTrigger={setTogglePopOut}
        trigger={togglePopOut} />}
      {/* <CalendarSuperAdminPopOut
        shift={shift}
        setTrigger={setTogglePopOut}
        trigger={togglePopOut}
      >
        {shift.shiftSupervisors?.length ? (
          <div>
            <h3>
              <b>Asignados en este turno:</b>
            </h3>
            {shift.shiftSupervisors?.map((supervisor) => (
              <div style={{ display: "flex" }} key={supervisor.id}>
                <p onClick={() => navigate(`/profile/${supervisor.id}/view`)}>
                  {supervisor.name}
                </p>

                { user.rol === "SuperAdmin" && 
                 <Button  style={{
           
                  fontSize: "12px",
                  padding: "2px 5px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  margin: "10px"
                }}
                        variant="contained"
                        onClick={() =>
                          handleDeleteSupervisor(supervisor.id, shift.shiftId)
                        }
                      >
                        X
                      </Button>
                }
               
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
     {user.rol === "SuperAdmin" && (
  <div>
    <h3>Nuevo turno a asignar:</h3>
    <label>{shift.day}</label>
    <p>{shift.time}</p>
  </div>
)}

       
      </CalendarSuperAdminPopOut> */}

    </Container>
  );
};

export default CalendarSupervisor;
