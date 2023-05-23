import { useDispatch, useSelector } from "react-redux";
import { getAllCompanionsPerShift } from "../../../Redux/Actions/viewActions";
import TimezoneMiddleware from "./TimezoneMiddleware";
import { useEffect, useState } from "react";
import CalendarCompanionSAPopOut from "./CalendarCompanionSAPopOut";
import CalendarCompanionPopOut from "./CalendarCompanionPopOut";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip
} from "@mui/material";
import "./CalendarCompanion.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";
import {
  toastSuccess,
  toastError,
  toastWarning,
} from "../../../Redux/Actions/alertStyle";
import { toast } from "sonner";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";

const CalendarCompanion = () => {
  let companionCount;
  let maxCompanions;
  const [togglePopOut, setTogglePopOut] = useState(false);
  const [shift, setShift] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const user = useSelector((state) => state.auth.user);

  // Estado con la totalidad de los turnos, esten asignados o no:
  let unprocessedShifts = useSelector((state) => state.view.companionsPerShift);
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
          day: "Miércoles",
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
          day: "Sábado",
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
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];
  let hours = [];

  hours = Array.from({ length: 24 }, (_, i) => {
    const currentHour = i < 10 ? `0${i}` : `${i}`;
    const nextHour =
      i === 22
        ? "24"
        : i === 23
        ? "01"
        : (i + 2) % 24 < 10
        ? `0${(i + 2) % 24}`
        : `${(i + 2) % 24}`;
    return `${currentHour}:00-${nextHour}:00`;
  });

  const handleClickCell = (hour, day) => {
    const found = perShift.find(
      (shift) => shift.time === hour && shift.day === day
    );

    if (user.rol === "Companion1" && user.CompanionShifts?.length > 0) {
      return toast.error("Ya cuentas con un turno reservado", toastWarning); // Si Companion1 ya tiene un turno reservado, no hacer nada
    }
    if (user.rol !== "Companion1" || (user.rol === "Companion1" && user.CompanionShifts?.length === 0)) {

        setTogglePopOut(!togglePopOut);
        setShift(found);
      }     
  };

  const handleDeleteShift = (idShift) => {
    if (user.rol === "Companion2") {
      Swal.fire({
        title: "¿Estás seguro que deseas eliminar este turno?",
        confirmButtonColor: "#00C8B2",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteCompanionShift(user.id, idShift));
        }
      });
    } else {
      toast.error(
        "No puedes eliminar este turno, comunícate con administración",
        toastWarning
      );
    }
  };

  useEffect(() => {
    dispatch(getAllCompanionsPerShift());
  }, [togglePopOut, user]);

    
  return !loading ? (
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
            Calendario Acompañantes
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="h7"
        sx={{ display: "flex", padding: "10px", fontFamily: "poppins" }}
      >
        Horarios dispuestos en la zona horaria: {user.CityTimeZone.offSet} {user.CityTimeZone.zoneName.replace("_", " ")}
      </Typography>
      <TableContainer component={Paper} className="calendar-container">
        <Table className="calendar-table">
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
                <TableCell className="hour">{hour}</TableCell>
                {days.map((day, index) => {
                  const found = shifts.find(
                    (shift) => shift.day === index && shift.time === hour
                  );
                   companionCount = found ? found.companionCount : 0;
                   maxCompanions = found ? found.maxCompanions : 0;
                  let countText = companionCount;
                  if (companionCount && maxCompanions) {
                    countText =
                      "Disponibles:  "  + (maxCompanions - companionCount) + ' de ' + maxCompanions;
                  }

                  // Determinar color de disponibilidad y estilos en línea
                  let cellStyle = {};
                  if (found) {
                    const availabilityRatio = companionCount / maxCompanions;

                    if (availabilityRatio <= 0.3) {
                      cellStyle.backgroundColor = "#269B40"; // Alta disponibilidad
                    } else if (availabilityRatio <= 0.5) {
                      cellStyle.backgroundColor = "#F0F34E"; // Amarillo Disponibilidad moderada
                    } else if (1 > availabilityRatio > 0.5) {
                      cellStyle.backgroundColor = "#F3F496"; //Poca disponibilidad
                    } else if (availabilityRatio == 1) {
                      cellStyle.backgroundColor = "lightgrey"; // Sin disponibilidad
                    }else{
                      cellStyle.backgroundColor = "lightgrey";
                    }
                  }

                  return user.rol === "Companion1" ||
                    user.rol === "Companion2" ? (
                    <TableCell
                    sx={{"&:hover": {cursor: "cell"}}}
                      key={day}
                      onClick={() =>
                        found &&
                        found.shiftCompanions.some(
                          (companion) => companion.id === user.id
                        )
                          ? handleDeleteShift(found.originalShift.shiftId)
                          : handleClickCell(hour, day)
                      }
                      style={{
                        ...cellStyle,
                        color:
                          (user.rol === "Companion1" ||
                            user.rol === "Companion2") &&
                          found &&
                          found.shiftCompanions.some(
                            (companion) => companion.id === user.id
                          )
                            ? "black" // Letra blanca para 'Mi turno'
                            : cellStyle.color, // Mantener el fondo según la disponibilidad
                        backgroundColor:
                          (user.rol === "Companion1" ||
                            user.rol === "Companion2") &&
                          found &&
                          found.shiftCompanions.some(
                            (companion) => companion.id === user.id
                          )
                            ? "#A2D1AD" // Fondo blanco para 'Mi turno'
                            : cellStyle.backgroundColor, // Mantener el fondo según la disponibilidad
                      }}
                    >
                      {(user.rol === "Companion1" ||
                        user.rol === "Companion2") &&
                      found &&
                      found.shiftCompanions.some(
                        (companion) => companion.id === user.id
                      ) ? (
                        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end", "&:hover": {cursor: "default"}}}>
                          Mi turno
                          {user.rol === "Companion2" && (
                           <IconButton sx={{"&:hover": {cursor: "pointer"}}} size="medium" aria-label="Eliminar Turno">
                              <DeleteForeverIcon sx={{color: "#616161"}}/>
                           </IconButton>
                          )}
                        </Box>
                      ) : (
                        maxCompanions >= companionCount ? ( 
                        <Box>
                          <Typography>{maxCompanions > companionCount ? "Disponibles: " : "No disponible"}</Typography>
                          <Typography sx={{display: maxCompanions === companionCount ? "none" : null}}> {(maxCompanions - companionCount) + ' de ' + maxCompanions}</Typography>
                         </Box> ) : (
                          <Typography>No disponible</Typography>
                         ) 

                      )}
                    </TableCell>
                  ) : (
                    (user.rol === "SuperAdmin" ||
                      user.rol === "Supervisor") && (
                      <TableCell
                        key={day}
                        onClick={() => handleClickCell(hour, day)}
                        style={cellStyle}
                      >
                       {maxCompanions >= companionCount ?
                       <Box>
                          <Typography>{maxCompanions > companionCount ? "Disponibles: " : "No disponible"}</Typography>
                          <Typography sx={{display: maxCompanions === companionCount ? "none" : null}}> {(maxCompanions - companionCount) + ' de ' + maxCompanions}</Typography>
                         </Box>
                       :(
                        <Tooltip title="Exceso de personal" placement="top"> 
                       <Typography sx={{color: "#C93838", "&:hover": {cursor: "pointer"}}}>{<ErrorOutlineIcon/>}</Typography>
                       </Tooltip>) }
                      </TableCell>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {user.rol === "SuperAdmin" || user.rol === "Supervisor" ? (
          <CalendarCompanionSAPopOut
            shift={shift}
            setTrigger={setTogglePopOut}
            trigger={togglePopOut}
            togglePopOut={togglePopOut}
            setTogglePopOut={setTogglePopOut}
          ></CalendarCompanionSAPopOut>
        ) : (
          <CalendarCompanionPopOut
            shift={shift}
            setTrigger={setTogglePopOut}
            trigger={togglePopOut}
            togglePopOut={togglePopOut}
            setTogglePopOut={setTogglePopOut}
          >
            <h3>Estas por reservar el siguiente turno:</h3>
            <label>{shift.day}</label>
            <p>{shift.time}</p>
          </CalendarCompanionPopOut>
        )}
      </TableContainer>
    </Container>
  ) : (
    <Loader />
  );
};
export default CalendarCompanion;
