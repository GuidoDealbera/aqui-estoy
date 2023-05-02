import { useDispatch, useSelector } from "react-redux"
import { getAllSupervisorShift } from "../../../Redux/Actions/viewActions"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useState } from "react";
const CalendarCompanion=()=>{
    // const[togglePopOut,setTogglePopOut]=useState(false)
    // const[shift,setShift]=useState({})
    // const dispatch=useDispatch()
    // let shifts=useSelector(state=>state.view.allCompanionShift)
    // console.log(shifts);
    // const user=useSelector(state=>state.auth.user)
    // if(shifts.length===0){
    //     dispatch(getAllSupervisorShift())
    // }
    // shifts=shifts.map((shift)=>{
    //     switch (shift.day) {
    //      case 0:
    //        return{
    //            ...shift,
    //            day:"Lunes"
    //        }
    //      case 1:
    //      return{
    //          ...shift,
    //          day:"Martes"
    //      }
    //      case 2:
    //      return{
    //          ...shift,
    //          day:"Miercoles"
    //      }
    //      case 3:
    //      return{
    //     ...shift,
    //      day:"Jueves"
    //       }
    //      case 4:
    //      return{
    //       ...shift,
    //          day:"Viernes"
    //      }
    //      case 5:
    //         return{
    //             ...shift,
    //             day:"Sabado"
    //         }
    //     case 6:
    //         return{
    //             ...shift,
    //             day:"Domingo"
    //         }
               
        
    //         default:
    //           return
    //     }
    //     })
    // const days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    // let hours=[]
    
}
export default CalendarCompanion