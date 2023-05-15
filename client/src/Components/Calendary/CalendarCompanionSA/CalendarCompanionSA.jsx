import { useDispatch, useSelector } from "react-redux";
import { getAllCompanionsPerShift } from "../../../Redux/Actions/viewActions";
// import {  Row, Col, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import CalendarCompanionSAPopOut from "./CalendarCompanionSAPopOut";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  Box,
  Grid
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CalendarCompanionSA = () => {
  const [togglePopOut, setTogglePopOut] = useState(false);
  const [shift, setShift] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Estado con la totalidad de los turnos, esten asignados o no:
  let shifts = useSelector((state) => state.view.companionsPerShift);

  const user = useSelector((state) => state.auth.user);
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
      const currentHour = i < 10 ? `0${i}` : `${i}`;
      const nextHour =
        i === 22 
        ? "24"
        :
        i === 23
          ? "01"
          : (i + 2) % 24 < 10
          ? `0${(i + 2) % 24}`
          : `${(i + 2) % 24}`;
      return `${currentHour}:00-${nextHour}:00`;
    });
  }

  const handleClickCell = (hour, day) => {
    let found = perShift.find(
      (shift) => shift.time === hour && shift.day === day
    );
    console.log(found);
    setTogglePopOut(!togglePopOut);
    //Actualizo estado local con 1 shift de onClick:
    setShift(found);
  };

  useEffect(() => {
    dispatch(getAllCompanionsPerShift());
  }, [togglePopOut]);

  // Render de cada celda:
  return (
    <Box>
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
      <Container className="calendar-container">
        <table className="calendar-table">
          <thead>
            <tr>
              <th></th>
              {days.map((day, index) => (
                <th key={index}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                <td className="hour">{hour}</td>
                {days.map((day, index) => {
                  const found = shifts.find(
                    (shift) => shift.day === index && shift.time === hour
                  );
                  const companionCount = found ? found.companionCount : 0;
                  const maxCompanions = found ? found.maxCompanions : 0;
                  let countText = companionCount;
                  if (companionCount && maxCompanions) {
                    countText = `${companionCount} de ${maxCompanions}`;
                  }

                  // Determinar color de disponibilidad y estilos en línea
                  let cellStyle = {};
                  if (found) {
                    const availabilityRatio = companionCount / maxCompanions;

                    if (availabilityRatio <= 0.3) {
                      cellStyle.backgroundColor = "lightgreen"; // Alta disponibilidad
                    } else if (availabilityRatio <= 0.5) {
                      cellStyle.backgroundColor = "#F0F34E"; // Disponibilidad moderada
                    } else if (availabilityRatio > 0.5) {
                      cellStyle.backgroundColor = "#C93838"; // Sin disponibilidad
                    }
                  }


                  return (
                    <td
                      key={day}
                      onClick={() => handleClickCell(hour, day)}
                      style={{ ...cellStyle, color: "grey" }}
                    >
                      {countText || "Disponible"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <CalendarCompanionSAPopOut
        shift={shift}
        setTrigger={setTogglePopOut}
        trigger={togglePopOut}
        togglePopOut={togglePopOut}
        setTogglePopOut={setTogglePopOut}
        ></CalendarCompanionSAPopOut>
      </Container>
    </Box>
  );
};
export default CalendarCompanionSA;
