import { Button, Box, Avatar, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";

export default function Supervisor(props) {
  const navigate = useNavigate();

  const { user } = props;

  const estilos = {
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    width: "100%",
    height: "4vw",
    boxShadow: "5px 5px 5px #C8CCD8",
  };

  const toEdit = () => {
    navigate(`/profile/${user.id}/edit`)
  }

  const H = "11"; //altura de los botones

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
            boxShadow: "2px 3px 5px #1E1C4E",
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
                margin: "auto",
                marginBottom: "1vw",
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
              Supervisor
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
              Estudios: {user.studies}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
              Género: {user.gender}
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
              padding: "1vw",
            }}
          >
            <Button variant="contained" style={estilos}>
              Horarios de Supervisión
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              width: "90%",
              padding: "1vw",
            }}
          >
            <Button
              onClick={() => {
                navigate("/panel-supervision");
              }}
              variant="contained"
              style={estilos}
            >
              Panel de Supervisión
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              width: "90%",
              padding: "1vw",
            }}
          >
            <Button
              onClick={() => {
                navigate("/companionsAtCharge");
              }}
              variant="contained"
              style={estilos}
            >
              Acompañantes a mi Cargo
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              width: "90%",
              padding: "1vw",
            }}
          >
            <Button variant="contained" style={estilos}>
              Centro de Aprendizaje
            </Button>
          </Grid>
          <Grid
            item
            sx={{
              width: "90%",
              padding: "1vw",
            }}
          >
            <Button variant="outined" style={estilos} onClick={toEdit}>
              Editar mi Información
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loader />
  );
}
