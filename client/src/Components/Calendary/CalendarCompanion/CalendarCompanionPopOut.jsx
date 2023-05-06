import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarCompanionPopOut.module.css"
import { postAssignSupervisorShift,postAssignCompanionShift } from "../../../Redux/Actions/postPutActions"

const CalendarPopOut=(props)=>{
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const handleConfirm=()=>{
        if(confirm("Estas seguro que quieres confirmar el turno ?") == true){
          if(user.rol==="Companion"||user.rol==="Companion2"){

            dispatch(postAssignCompanionShift(user.id,props.shift.id.toString(),user.rol) )

            props.setTrigger()
       
         }
        if(user.rol==="Supervisor"||user.rol==="SuperAdmin"){
            dispatch(postAssignSupervisorShift(user.id,props.shift.id.toString(),user.rol))
            props.setTrigger()
      
         }

         props.setTrigger()
        }else{
            props.setTrigger()
        }
    }

    return (props.trigger)?(
        <div onClick={()=>props.setTrigger()} className={s.popOut}>
            <div className={s.innerPop}>
         {props.children}
         <button onClick={()=>handleConfirm()}>Confirma tu turno !</button>
         <button onClick={()=>props.setTrigger()}>Cancelar</button>
            </div>
        </div>
    ):""
}
export default CalendarPopOut