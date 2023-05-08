import { Button, Box, Avatar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../../Loader/Loader";


export default function Companion(props) {
  const allSupervisors = useSelector(state => state.view.allSupervisors);
  const SuperId = props.user.SupervisorId;
  let MentorName = "No asignado";

  const result = allSupervisors.find((supervisor)=>{
    if (supervisor.id === SuperId) return supervisor
  })
  console.log("result");
  console.log(result);
  if (result) {
  const { name, lastName } = result;
  MentorName = `${name} ${lastName}`;
  }

  const estilos = {
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    boxShadow: "5px 5px 5px #C8CCD8",
  };

  const { user } = props;

  return Object.entries(user).length > 0 ? (
    <Box>
      <Grid
        container
        margin={"auto"}
        sx={{
          width: "60vw",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            width: "50vw",
            boxShadow: "5px 5px 5px #C8CCD8",
            borderRadius: "5%",
          }}
          xs={12}
          md={5}
        >
          <Grid
            item
            margin={1}
          >
            <Avatar
              alt={user.name}
              src={user.profilePhoto}
              sx={{
                width: 150,
                height: 150,
                marginBottom: "1vw",
                margin: "auto",
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
              {user.rol === "Companion2" ? "Acompañante 2" : "Acompañante 1"}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              Teléfono: {user.phone}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              Ubicación: {user.country}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.CityTimeZone?.offSet}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              {user.studies}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              Género: {user.gender}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              Mentor: {MentorName}
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
          }}
        >
          <Grid
            item
            sx={{
              width: "90%",
              height: "30%",
              padding: "1vw",
            }}
          >
            <Link to="/calendarCompanion">
              <Button variant="outlined" style={estilos}>
                Reserva de turno de voluntariado
              </Button>
            </Link>
          </Grid>

          <Grid
            item
            sx={{
              width: "90%",
              height: "30%",
              padding: "1vw",
            }}
          >
            <Button variant="outlined" style={estilos}>
              Centro de aprendizaje
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              width: "90%",
              height: "30%",
              padding: "1vw",
            }}
          >
            <Link to="/register">
              <Button variant="outlined" style={estilos}>
                Editar mi información
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loader />
  );
}
