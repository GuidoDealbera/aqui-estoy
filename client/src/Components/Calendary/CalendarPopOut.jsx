import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarPopOut.module.css"
import { postAssignSupervisorShift,postAssignCompanionShift } from "../../Redux/Actions/postPutActions"

const CalendarPopOut=(props)=>{
    const {user}=useSelector(state=>state.auth)
    console.log(user);
    const dispatch=useDispatch()
    const handleConfirm=()=>{
        
         if(user.rol==="Companion"){
            dispatch(postAssignCompanionShift(user.id,props.shift.id.toString(),user.rol) )
            props.setTrigger()
       
         }
        if(user.rol==="Supervisor"){

            dispatch(postAssignSupervisorShift(user.id,props.shift.id.toString(),user.rol))
            props.setTrigger()
            // alert("Tu turno ha sido confirmado")
         }
   
            // console.log(error.message);
            // alert("No fue posible asignar el turno")
            props.setTrigger()
        
     
    }
    return (props.trigger)?(
        <div onClick={()=>props.setTrigger()} className={s.popOut}>
            <div className={s.innerPop}>
         {props.children}
         <button onClick={handleConfirm}>Confirma tu turno !</button>
         <button onClick={()=>props.setTrigger()}>Cancelar</button>
            </div>
        </div>
    ):""
}
export default CalendarPopOut