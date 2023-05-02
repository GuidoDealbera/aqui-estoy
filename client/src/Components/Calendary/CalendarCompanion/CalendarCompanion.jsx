import { useDispatch, useSelector } from "react-redux"
import { getAllSupervisorShift } from "../../../Redux/Actions/viewActions"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
import CalendarPopOut from "../CalendarPopOut";
import calendar from "./CalendarCompanion.css"

const CalendarCompanion=()=>{
    let shifts=useSelector(state=>state.view.allSupervisorShift)
    const user=useSelector(state=>state.auth.user)
    const[togglePopOut,setTogglePopOut]=useState(false)
    const[shift,setShift]=useState({})
    const[rol,setRol]=useState(user.rol)
    const dispatch=useDispatch()
    shifts=shifts.map((shift)=>{
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
    if(shifts.length===0){
        dispatch(getAllSupervisorShift())
    }
    let hours=[]
    if(user.rol==="Acompañante"){
     
    }
    if(user.rol==="Acompañante2"){
   
    }
  if(user&&user.rol==="Companion"||user.isSuperCompanion){
//  console.log("user");
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
      let found = shifts.find(shift=>shift.time===hour&&shift.day===day)
      setTogglePopOut(!togglePopOut)
      setShift(found)

    }
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
              {days.map((day) => (
                <td 
                  onClick={()=>handleClickCell(hour,day)}
                >
              -----
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <CalendarPopOut  rol={rol} shift={shift} setTrigger={setTogglePopOut} trigger={togglePopOut}>
        <h3>Estas seguro que quieres confirmar este turno:</h3>
        <label>{shift.day}</label>
        <p>{shift.time}</p>
      </CalendarPopOut>
      </Container>
};
export default CalendarCompanion