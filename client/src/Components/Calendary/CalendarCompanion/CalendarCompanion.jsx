import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllCompanionShift,
  getAllCompanionsPerShift,
} from "../../../Redux/Actions/viewActions";
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";
import {
  toastSuccess,
  toastError,
  toastWarning,
} from "../../../Redux/Actions/alertStyle";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Grid
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarCompanionPopOut from "./CalendarCompanionPopOut";
import "./CalendarCompanion.css";

const CalendarCompanion = () => {
  const navigate = useNavigate();
  let shifts = useSelector((state) => state.view.companionsPerShift);

  const user = useSelector((state) => state.auth.user);
  const [togglePopOut, setTogglePopOut] = useState(false);
  const [shift, setShift] = useState({
    id: "",
    day: "",
    time: "",
    timezone: "",
  });
  const [rol, setRol] = useState(user.rol);
  const dispatch = useDispatch();
  shifts = shifts.map((shift) => {
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
  useEffect(() => {
    dispatch(getAllCompanionsPerShift());
  }, [togglePopOut]);

  let hours = [];

  if ((user && user.rol === "Companion1") || user.rol === "Companion2") {
    hours = Array.from({ length: 24 }, (_, i) => {
      const currentHour = i < 10 ? `0${i}` : `${i}`;
      const nextHour =
        i === 22
          ? "24"
          
          : (i + 2) % 24 < 10
          ? `0${(i + 2) % 24}`
          : `${(i + 2) % 24}`;
      return `${currentHour}:00-${nextHour}:00`;
    });
  }

  const handleClickCell = (hour, day) => {
    let found = shifts.find(
      (shift) => shift.time === hour && shift.day === day
    );
    if (user.rol === "Companion1" && user.CompanionShifts.length > 0) {
      toast.error("Ya tienes un turno asignado", toastError);
    } else {
      setTogglePopOut(!togglePopOut);
      setShift({ ...found, id: found.id });
      console.log(found);
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
          // Swal.fire({
          //   title: 'Turno eliminado',
          //   icon: 'success',
          //   timer: 1000,
          //   showConfirmButton: false,
          //   width: "22%"
          // })
        }
      });
    } else {
      toast.error("No puedes eliminar este turno", toastWarning);
    }
  };

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
            Reserva de Turnos de Voluntariado
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
                  const found = user.CompanionShifts?.find(
                    (shift) => shift.day === index && shift.time === hour
                  );
                  if (found) {
                    return (
                      <td
                        id={found.id}
                        className="reserved"
                        onClick={() => handleDeleteShift(found.id)}
                      >
                        {user.rol === "Companion2" ? (
                          <>
                            {" "}
                            Reservado{" "}
                            <button className="delete-button">X</button>{" "}
                          </>
                        ) : (
                          "Reservado"
                        )}
                      </td>
                    );
                  } else {
                    return (
                      <td
                        className="calendar-cell"
                        onClick={() => handleClickCell(hour, day)}
                      >
                        Disponible
                      </td>
                    );
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>

        <CalendarCompanionPopOut
          rol={rol}
          shift={shift}
          setTrigger={setTogglePopOut}
          trigger={togglePopOut}
        >
          <h3>Estas por reservar el siguiente turno:</h3>
          <label>{shift.day}</label>
          <p>{shift.time}</p>
        </CalendarCompanionPopOut>
      </Container>
    </Box>
  );
};
export default CalendarCompanion;
