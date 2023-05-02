import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarPopOut.module.css"
import { postAssignSupervisorShift,postAssignCompanionShift } from "../../Redux/Actions/postPutActions"

const CalendarPopOut=(props)=>{
    const user=useSelector(state=>state.auth.user)

    const dispatch=useDispatch()
    const handleConfirm=()=>{
        
        if(props.rol==="Companion"){
            dispatch(postAssignCompanionShift(user.id,props.shift.id.toString()) )
            props.setTrigger()
            alert("Tu turno ha sido confirmado")
        }
        if(props.rol==="Supervisor"){

            dispatch(postAssignSupervisorShift(user.id,props.shift.id.toString(),user.rol))
            props.setTrigger()
            alert("Tu turno ha sido confirmado")
        }
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