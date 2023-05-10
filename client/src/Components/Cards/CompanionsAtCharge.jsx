import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCompanionsAtCharge } from "../../Redux/Actions/viewActions";
import Cards from "./Cards";
import { Box, Typography, Grid } from "@mui/material";
import { bgcolor, border } from "@mui/system";

export default function CompanionsAtCharge() {
  const dispatch = useDispatch();
  const { companionAtCharge } = useSelector((state) => state.view);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCompanionsAtCharge(user.id));
  }, []);

  const myDate = new Date();
  const myTimeZone = myDate.toString().match(/([\+-][0-9]+)/)[1];
  const myHours = myDate.getHours();
  const myMinutes = myDate.getMinutes();

  return (
    <Box>
      <Grid item>
        <Typography display="block" variant="h6" marginLeft={"3vw"}>
          Acompañantes a mi Cargo
        </Typography>
      </Grid>

      <Box
      key={user.id}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "2vw",
          justifyContent: "center",
        }}
      >
        {companionAtCharge.map((e) => {
          //-----------------------------------reemplazar por lo que se trae de Redux--------------------
          // const eTimeZone = "-0300"; 
          const eTimeZone = Number(e.CityTimeZone.offSet.toString().slice(-6,-3))*100;
          // console.log("eTimeZone");
          // console.log(eTimeZone);
           //---------------------------------------------------------------------------------------------
          let horaLoc = Number(myHours) + ((Number(eTimeZone) - Number(myTimeZone)))/100;
          horaLoc = horaLoc + ":" + myMinutes;
          console.log(eTimeZone);
          return (
            <Box>
              <Cards
                id={e?.id}
                name={e?.name}
                lastName={e?.lastName}
                profilePhoto={e?.profilePhoto}
                phone={e?.phone}
                email={e?.email}
                country={e?.country}
                horaLocal={horaLoc}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
