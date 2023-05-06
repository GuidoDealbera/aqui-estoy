import {
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Supervisor(props) {
  const navigate = useNavigate();

  const { user } = props;

  const estilos = {
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
  };

  return (
    <Box>
      <Grid
        container
        margin={"auto"}
        sx={{
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
            borderColor: "#1E1C4E",
            borderStyle: "solid",
            borderRadius: "5%",
          }}
          xs={12}
          md={5}
        >
          <Grid item marginTop={1}>
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
                " " +
                user.lastName?.charAt(0).toUpperCase() +
                user.lastName?.slice(1)}
            </Typography>
          </Grid>

          <Grid item textAlign={"center"}>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.profession}
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
            height: "20%",
            padding: "1vw",
            // borderColor: "blue",
            // borderStyle: "solid",
          }}
        >
          <Button variant="contained" style={estilos}>
            Disponibilidad de turnos de voluntariado
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            width: "90%",
            height: "20%",
            padding: "1vw",
            // borderColor: "blue",
            // borderStyle: "solid",
          }}
        >
          <Button variant="contained" style={estilos}>
            Horarios de supervisión
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            width: "90%",
            height: "20%",
            padding: "1vw",
            // borderColor: "blue",
            // borderStyle: "solid",
          }}
        >
          <Button
            onClick={() => {
              navigate("/companionsAtCharge");
            }}
            variant="contained"
            style={estilos}
          >
            Personas a cargo
          </Button>
        </Grid>

        <Grid
          item
          sx={{
            width: "90%",
            height: "20%",
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
