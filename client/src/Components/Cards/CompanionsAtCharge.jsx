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
  const utcUser = user.CityTimeZone?.offSet;
  console.log(utcUser);

  useEffect(() => {
    dispatch(getCompanionsAtCharge(user.id));
  }, []);

  return (
    <Box>
      <Grid item>
        <Typography display="block" variant="h6" marginLeft={"3vw"}>
          Acompañantes a tu cargo
        </Typography>
      </Grid>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "2vw",
          justifyContent: "center",
          //background: "linear-gradient(to top, #C8CCD0, #ffffff, #ffffff)",
        }}
      >
        {companionAtCharge.map((e) => {
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
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
