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
    <Grid
      container
      sx={{
        background:
          "linear-gradient(to right top, #ffffff, #ffffff , #ffffff, #77DED2, #00C8B2, #1CB4E4)",
      }}
      height="100%"
    >
      <Grid
        item
        sx={{
          flexDirection: "column",
          marginTop: "1rem",
        }}
        xs={12}
        md={3.5}
      >
        <Grid item marginTop={7}>
          <Avatar
            alt={user.name}
            src={user.profileImage}
            sx={{ width: 190, height: 190 }}
          />
          <Typography variant="h3">
            {user.name?.charAt(0).toUpperCase() +
              user.name?.slice(1) +
              ", " +
              user.lastName?.charAt(0).toUpperCase() +
              user.lastName?.slice(1)}
          </Typography>
        </Grid>

        <Typography variant="h5" marginTop={2}>
          {user.birthDate}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.nacionality}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.country}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.timeZone}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.email}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.phone}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.profession}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.studies}
        </Typography>
        <Typography variant="h5" marginTop={1}>
          {user.gender}
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        md={8.5}
        sx={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: "space-around",
          }}
        >
          <Grid item md={5} xs={12} height="100%" marginTop={3}>
            <Button variant="contained" style={estilos}>
              Reserva de turno de voluntariado
            </Button>
          </Grid>
          <Grid item md={5} xs={12} height="100%" marginTop={3}>
            <Button variant="contained" style={estilos}>
              Centro de aprendizaje
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
