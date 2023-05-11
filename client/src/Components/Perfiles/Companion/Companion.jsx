import { Button, Box, Avatar, Typography, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { getSurpervisorMatch } from "../../../Redux/Actions/viewActions";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Companion(props) {
  const userLog = props.user.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allSupervisors = useSelector((state) => state.view.allSupervisors);
  const { loading } = useSelector((state) => state.auth);
  const SuperId = props.user.SupervisorId;

  let MentorName = "No asignado";
  let superOffset = "";
  let superPhone = "";

  const result = allSupervisors.find((supervisor) => {
    if (supervisor.id === SuperId) return supervisor;
  });
  if (result) {
    const { name, lastName, CityTimeZone, phone } = result;
    MentorName = `${name} ${lastName}`;
    superOffset = Number(CityTimeZone?.offSet.toString().slice(-6, -3)) * 100;
    superPhone = phone;
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

  const toEdit = () => {
    navigate(`/profile/${user.id}/edit`);
  };

  const myDate = new Date();
  const myTimeZone = myDate.toString().match(/([\+-][0-9]+)/)[1];
  const myHours = myDate.getHours();
  const myMinutes = myDate.getMinutes();

  let horaLoc = Number(myHours) + (superOffset - Number(myTimeZone)) / 100;
  horaLoc >= 24 ? (horaLoc = horaLoc - 24) : null;

  horaLoc =
    (horaLoc < 10 ? `0${horaLoc}` : horaLoc) +
    ":" +
    (myMinutes < 10 ? `0${myMinutes}` : myMinutes);

  return !loading ? (
    <Box>
      <Grid
        container
        margin={"auto"}
        sx={{
          width: "75vw",
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
            position: "relative",
          }}
          xs={12}
          md={5}
          paddingY="20px"
          paddingX="10px"
        >
          <Grid item margin={1}>
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
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              {user.rol === "Companion2"
                ? "Acompañante Nivel 2"
                : "Acompañante Nivel 1"}
            </Typography>
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Teléfono: {user.phone}
            </Typography>
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Ubicación: {user.country}
            </Typography>
            {/* <Typography display="block" variant="h7" marginTop={1}>
              {user.CityTimeZone?.offSet}
            </Typography> */}
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Estudios: {user.studies}
            </Typography>
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Género: {user.gender}
            </Typography>
            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Mentor: {MentorName}
              {MentorName !== "No asignado" && (
                <a href={`https://wa.me/${superPhone}`} target="_blank">
                  <WhatsAppIcon
                    sx={{
                      borderRadius: "50px",
                      marginLeft: "3%",
                      color: "green",
                      "&:hover": { boxShadow: "0 0 10px grey" },
                    }}
                  />
                </a>
              )}
            </Typography>

            {MentorName !== "No asignado" && (
              <Typography
                display="block"
                variant="p"
                marginTop={1}
                sx={{ fontFamily: "poppins" }}
              >
                Hora local del mentor: {horaLoc}
              </Typography>
            )}
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
              height: "22%",
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
              height: "22%",
              padding: "1vw",
            }}
          >
            <Button
              onClick={() => dispatch(getSurpervisorMatch(userLog))}
              variant="contained"
              style={estilos}
            >
              Supervisor a cargo
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              width: "90%",
              height: "22%",
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
              height: "22%",
              padding: "1vw",
            }}
          >
            <Button variant="outlined" style={estilos} onClick={toEdit}>
              Editar mi información
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loader />
  );
}
