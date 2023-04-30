import { voluntario } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { getCompanionsAtCharge } from "../../Redux/Actions/viewActions"
import Cards from "./Cards";
import { Box } from "@mui/material";

export default function CompanionsAtCharge() {
  // const dispatch= useDispatch();
  // const companions= useSelector((state)=> state.view)
  // console.log(companions+" <------este es el console log")

  // useEffect(()=>{
  // dispatch(getCompanionsAtCharge())
  // },[dispatch])
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      {voluntario.map((e) => {
        return(
        <Box>
          <Cards
            lastName={e.lastName}
            name={e.name}
            profilePhoto={e.profilePhoto}
            phone={e.phone}
            email={e.email}
            country={e.country}
          />
        </Box>
        )}
      )}
    </Box>
  );
}
