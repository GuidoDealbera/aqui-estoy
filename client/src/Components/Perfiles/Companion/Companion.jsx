import {
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Companion(props) {
  const estilos = {
    color: "#151515",
    background: "#C8E8C7",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
  };

  const { user } = props;
  return (
    <Box>
      <Grid
        container
        margin={"auto"}
        sx={{
          background:
            "linear-gradient(to right top, #ffffff, #ffffff , #ffffff, #77DED2, #00C8B2, #1CB4E4)",
          width: "60vw",
          flexDirection: "row",
          justifyContent: "center",
          // borderColor: "red",
          // borderStyle: "solid",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            width: "50vw",
            // borderColor: "lightGray",
            // borderStyle: "solid",
          }}
          xs={12}
          md={5}
        >
          <Grid
            item
            margin={1}
            // sx={{ borderColor: "green", borderStyle: "solid" }}
          >
            <Avatar
              alt={user.name}
              src={user.profilePhoto}
              sx={{
                width: 150,
                height: 150,
                marginBottom: "1vw",
                margin: "auto",
                // borderColor: "blue",
                // borderStyle: "solid",
                
              }}
            />
            <Typography variant="h5" textAlign="center">
              {user.name?.charAt(0).toUpperCase() +
                user.name?.slice(1) +
                ", " +
                user.lastName?.charAt(0).toUpperCase() +
                user.lastName?.slice(1)}
            </Typography>
          </Grid>
          <Grid item textAlign={"center"}>
            <Typography display="block" variant="h6" marginTop={1}>
              {`${user.profession}\n`}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.email}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.phone}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.country}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.CityTimeZone.offSet}
            </Typography>
            {/* <Typography display="block" variant="h7" marginTop={1}>
              {user.nationality}
            </Typography> */}
            {/* <Typography display="block" variant="h7" marginTop={2}>
              {user.birthdayDate}
            </Typography> */}
            <Typography display="block" variant="h7" marginTop={1}>
              {user.studies}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.gender}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          xs={12}
          md={5}
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            // borderColor: "violet",
            // borderStyle: "solid",
          }}
        >
          <Grid
            item
            sx={{
              
              width: "90%",
              height: "40%",
              padding: "1vw",
              // borderColor: "blue",
              // borderStyle: "solid",
            }}
          >
            <Button variant="contained" style={estilos}>
              Reserva de turno de voluntariado
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              
              width: "90%",
              height: "40%",
              padding: "1vw",
              // borderColor: "blue",
              // borderStyle: "solid",
            }}
          >
            <Button variant="contained" style={estilos}>
              Centro de aprendizaje
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
