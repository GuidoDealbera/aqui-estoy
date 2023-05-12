import { useDispatch, useSelector } from "react-redux"
import { getAllSupervisorShift, getAllSupervisors, getAllSupervisorsPerShift } from "../../../Redux/Actions/viewActions"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from "react";
import CalendarSuperAdminPopOut from "./CalendarSuperAdminPopOut";
import { useNavigate } from "react-router-dom";
import { deleteSupervisorShift } from "../../../Redux/Actions/postPutActions";

const CalendarSupervisor=()=>{
    const[togglePopOut,setTogglePopOut]=useState(false)
    const[shift,setShift]=useState({})
    const dispatch=useDispatch();
    const navigate = useNavigate();

    // Estado con la totalidad de los turnos, esten asignados o no:
    let shifts=useSelector(state=>state.view.supervisorsPerShift)
  
    const user=useSelector(state=>state.auth.user)
    //Armado de calendario:
   let perShift=shifts.map((shift)=>{
        switch (shift.day) {
         case 0:
           return{
               ...shift,
               day:"Lunes"
           }
         case 1:
         return{
             ...shift,
             day:"Martes"
         }
         case 2:
         return{
             ...shift,
             day:"Miercoles"
         }
         case 3:
         return{
        ...shift,
         day:"Jueves"
          }
         case 4:
         return{
          ...shift,
             day:"Viernes"
         }
         case 5:
            return{
                ...shift,
                day:"Sabado"
            }
        case 6:
            return{
                ...shift,
                day:"Domingo"
            }
               
        
            default:
              return
        }
        })
    const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
 
    let hours=[]
  if(user&&user.rol==="SuperAdmin"){
 
hours = Array.from({ length: 24 }, (_, i) => {
    if(i<9){
        return `0${i}:00-0${i+1}:00`
    }
    if(i===9){
        return `0${i}:00-${i+1}:00`
    }
 
    return `${i}:00-${i===23?"00":i+1}:00`
});
}


    const handleClickCell=(hour,day)=>{
      let found = perShift.find(shift=>shift.time===hour&&shift.day===day)
      console.log(found);
      setTogglePopOut(!togglePopOut)
      //Actualizo estado local con 1 shift de onClick:
      setShift(found);
    }

      useEffect(()=>{      
        dispatch(getAllSupervisorsPerShift());
            },[shifts])
   
     // Render de cada celda:
return  <Container className="calendar-container">
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
                const supervisorCount = found ? found.supervisorCount : 0;
                const maxSupervisors = found ? found.maxSupervisors : 0;             
                let countText = supervisorCount;
                if (supervisorCount && maxSupervisors) {
                  countText = `${supervisorCount}/${maxSupervisors}`;
                }

                return (
                  <td
                    key={day}
                    onClick={() => handleClickCell(hour, day)}
                  >
                    {countText || "-----"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      
      <CalendarSuperAdminPopOut shift={shift} setTrigger={setTogglePopOut} trigger={togglePopOut}>
  
  {shift.shiftSupervisors?.length ? (
    <div >
      <h3><b>Asignados en este turno:</b></h3>
      {shift.shiftSupervisors?.map((supervisor) => (
     <div style={{display:"flex"}}>
     <p
          key={supervisor.id}
          onClick={(e) => {
            navigate(`/profile/${supervisor.id}/view`);
          }}
        >
          {supervisor.name} 
        </p>
        <button onClick={()=> dispatch(deleteSupervisorShift(supervisor.id, shift.shiftId))}>X</button>
        </div>

      ))}
    </div>
  ) : (
    ''
  )}
  <h3>Nuevo turno a asignar:</h3>
  <label>{shift.day}</label>
  <p>{shift.time}</p>
</CalendarSuperAdminPopOut>
</Container>

};
export default CalendarSupervisor