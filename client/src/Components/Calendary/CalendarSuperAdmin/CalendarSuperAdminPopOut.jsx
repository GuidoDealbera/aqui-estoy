import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarSuperAdminPopOut.module.css"
import { postAssignSupervisorShift,postAssignCompanionShift } from "../../../Redux/Actions/postPutActions"

const CalendarSuperAdminPopOut=(props)=>{
    const {user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    const handleConfirm=()=>{
        if(confirm("Estas seguro que quieres confirmar el turno ?") == true){
          if(user.rol==="Companion"){

            dispatch(postAssignCompanionShift(user.id,props.shift.id.toString(),user.rol) )

            props.setTrigger()
       
         }
        if(user.rol==="Supervisor"||user.isSuperAdmin){
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
export default CalendarSuperAdminPopOut