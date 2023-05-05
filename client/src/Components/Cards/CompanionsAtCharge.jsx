//import { voluntario } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCompanionsAtCharge } from "../../Redux/Actions/viewActions";
import Cards from "./Cards";
import { Box } from "@mui/material";
import { voluntario } from "../../data";
import { bgcolor, border } from "@mui/system";

export default function CompanionsAtCharge() {
   const dispatch= useDispatch();
   const {companionAtCharge}= useSelector((state)=> state.view);
   const {user} = useSelector(state => state.auth);


    useEffect(()=>{
     dispatch(getCompanionsAtCharge(user.id))
   },[])

  //const user = voluntario
  return (
    <Box sx={{
        display: "flex",
        height: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
        background: "linear-gradient(to top, #C8CCD0, #ffffff, #ffffff)",
      }}>
      {companionAtCharge.map((e) => {
        return(
        <Box>
          <Cards 
            name={e?.name}
            lastName={e?.lastName}          
            profilePhoto={e?.profilePhoto}
            phone={e?.phone}
            email={e?.email}
            country={e?.country}
          />
        </Box>
        )}
      )}
    </Box>
  );
}
