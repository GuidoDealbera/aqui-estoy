import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCompanionShift, getAllSupervisorShift } from "../../Redux/Actions/viewActions";
// import { Box, DateRangeCalendar } from "@mui/material";

export default function CompanionCalendary (props){

    const dispatch= useDispatch()
    const {allCompanionShift, allSupervisorShift}= useSelector((state)=>state.view)
    useEffect(() => {
        dispatch(getAllCompanionShift())
        dispatch(getAllSupervisorShift())
    },[dispatch])
    console.log(Date(0))
    // console.log(allSupervisorShift+ "este es el supervisor")

    return(
        <div>
            <h1>Calendary</h1>
            <p>{allCompanionShift?.map(e=>e.day)}</p>
            <p>{allCompanionShift?.map(e=>e.time)}</p>
            
        </div>
    )
}