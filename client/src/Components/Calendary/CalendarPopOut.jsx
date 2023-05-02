import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarPopOut.module.css"
import { postAssignSupervisorShift } from "../../Redux/Actions/postPutActions"

const CalendarPopOut=(props)=>{
    const user=useSelector(state=>state.auth.user)

    const dispatch=useDispatch()
    const handleConfirm=()=>{
dispatch(postAssignSupervisorShift(user.id,props.shift.id.toString(),user.rol))
props.setTrigger()
alert("Tu turno a sido confirmado")
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