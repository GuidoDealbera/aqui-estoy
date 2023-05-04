//import { voluntario } from "../../data";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCompanionsAtCharge } from "../../Redux/Actions/viewActions";
import Cards from "./Cards";
import { Box } from "@mui/material";

export default function CompanionsAtCharge() {
  const dispatch= useDispatch();
  const {companionAtCharge}= useSelector((state)=> state.view);
  const {user} = useSelector(state => state.auth);


   useEffect(()=>{
    dispatch(getCompanionsAtCharge(user.id))
  },[])
  console.log(companionAtCharge)
  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}>
      {companionAtCharge.map((e) => {
        return(
        <Box>
          <Cards
            name={e.name}
            lastName={e.lastName}          
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
