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
    <Grid container>
      <Grid itemm xs={12}>
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
          height:"85vh",
          width:"100vw"
        }}
      >
        {companionAtCharge?.map((e) => {
          const eTimeZone =
            Number(e.CityTimeZone?.offSet.toString().slice(-6, -3)) * 100;
          let horaLoc =
            Number(myHours) + (Number(eTimeZone) - Number(myTimeZone)) / 100;
          
          horaLoc >= 24 ? horaLoc = horaLoc - 24 : null;
          
          horaLoc =
            (horaLoc < 10 ? `0${horaLoc}` : horaLoc) +
            ":" +
            (myMinutes < 10 ? `0${myMinutes}` : myMinutes);

          return (
            <Grid item xs={11} sm={6} md={4} lg={3}>
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
            </Grid>
          );
        })}
      </Box>
    </Grid>
  );
}
