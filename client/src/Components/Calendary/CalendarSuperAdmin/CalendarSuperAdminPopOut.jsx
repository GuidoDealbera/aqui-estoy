import { useDispatch, useSelector } from "react-redux"
import s from "./CalendarSuperAdminPopOut.module.css"
import { postAssignSupervisorShift,postAssignCompanionShift } from "../../../Redux/Actions/postPutActions"
import {Autocomplete,TextField} from "@mui/material"
import { useState } from "react"


const CalendarSuperAdminPopOut=(props)=>{
    const[supervisorId,setSupervisorId]=useState({
        name:"",
        id:""
    })
    const {user}=useSelector(state=>state.auth)
    let supervisors=useSelector(state=>state.view.allSupervisors)
    supervisors=supervisors.map(supervisor=>{
        if (!supervisor.name) {
            return
        }
        return {id:supervisor.id,label:`${supervisor.name} ${supervisor.lastName}`}
    })
    supervisors=supervisors.filter(supervisor=>supervisor)
    const dispatch=useDispatch()
 
    const handleConfirm=()=>{
        if(confirm("Estas seguro que quieres confirmar el turno ?") == true){
        if(user.rol==="SuperAdmin"){
            dispatch(postAssignSupervisorShift(supervisorId.id,props.shift.id.toString(),user.rol))
            props.setTrigger()
      
         }

         props.setTrigger()
        }else{
            props.setTrigger()
        }
    }
    const handleChange=(e,value)=>{

      setSupervisorId({
        name:value.label,
        id:value.id
      })

    }

    return (props.trigger)?(
        <div  className={s.popOut}>
            <div className={s.innerPop}>
         {props.children}
         <Autocomplete
             disablePortal
             id="combo-box"
             options={supervisors}
             onChange={handleChange}
             sx={{ width: 300 }}
             renderInput={(params) => <TextField {...params} label="Selecciona un supervisor" />}
           />
          <h3>{`Para: ${supervisorId.name}`}</h3>
         <button onClick={()=>handleConfirm()}>Confirma el turno !</button>
         <button onClick={()=>props.setTrigger()}>Cancelar</button>
            </div>
        </div>
    ):""
}
export default CalendarSuperAdminPopOut