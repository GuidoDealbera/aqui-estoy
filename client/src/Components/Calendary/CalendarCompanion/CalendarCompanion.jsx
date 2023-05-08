import { useDispatch, useSelector } from "react-redux";
import { getAllCompanionShift } from "../../../Redux/Actions/viewActions";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import CalendarCompanionPopOut from "./CalendarCompanionPopOut";
import calendar from "./CalendarCompanion.css";
import { deleteCompanionShift } from "../../../Redux/Actions/postPutActions";

const CalendarCompanion = () => {
  let shifts = useSelector((state) => state.view.allCompanionShift);

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
  if (shifts.length === 0) {
    dispatch(getAllCompanionShift());
  }
  let hours = [];

  if ((user && user.rol === "Companion1") ||user.rol==="Companion2") {
    hours = shifts.map((shift) => shift.time);
    hours = hours.slice(0, 25);
  }

  const handleClickCell = (hour, day) => {
    let found = shifts.find(
      (shift) => shift.time === hour && shift.day === day
    );
    setTogglePopOut(!togglePopOut);
    setShift({...found, id: found.id});
  };
  
  const handleDeleteShift =  (idShift) => {
    if (user.rol === "Companion2") {
      const confirmed = window.confirm("¿Estás seguro que deseas eliminar este turno?");
      if (confirmed) {
       dispatch(deleteCompanionShift(user.id, idShift));
      }
    } else {
      alert("Ya tienes este turno asignado");
    }
  }
  
  
  


  return (
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
                if (user.CompanionShifts === undefined) {
                  return (
                    <td onClick={() => handleClickCell(hour, day)}>-----</td>
                  );
                } else {
                  const found = user.CompanionShifts.find(
                    (shift) => shift.day === index && shift.time === hour
                  );
                  if (found) {
                    return (
                      <td
                        id={found.id}
                        className="reserved"
                        onClick={()=> handleDeleteShift(found.id)}
                      >
                        {user.rol === "Companion2" ? (<> Turno reservado <button>X</button> </> ) : ("Turno reservado")}
                      </td>
                    );
                  }
                }

                return (
                  <td onClick={() => handleClickCell(hour, day)}>-----</td>
                );
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
        <h3>Estas seguro que quieres confirmar este turno:</h3>
        <label>{shift.day}</label>
        <p>{shift.time}</p>
      </CalendarCompanionPopOut>
    </Container>
  );
};
export default CalendarCompanion;
