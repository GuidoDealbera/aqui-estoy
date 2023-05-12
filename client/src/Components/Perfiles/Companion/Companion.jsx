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
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    margin: '0.5rem 0',
    width: '100%',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          maxWidth: '75vw',
          margin: 'auto',
        }}
      >
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '5%',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Avatar
              alt={user.name}
              src={user.profilePhoto}
              sx={{ width: 150, height: 150, alignSelf: 'center' }}
            />
            <Typography variant="h5" textAlign="center" component="div">
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

            <Typography
              display="block"
              variant="p"
              marginTop={1}
              sx={{ fontFamily: "poppins" }}
            >
              Mi Hora Local: {myHours}:{myMinutes}
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
          xs={12}
          md={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Link to="/calendarCompanion" style={{ textDecoration: 'none' }}>
            <Button variant="contained" style={estilos}>
              Reserva de turno de voluntariado
            </Button>
          </Link>

          <Button
            onClick={() => dispatch(getSurpervisorMatch(userLog))}
            variant="contained"
            style={estilos}
          >
            Supervisor a cargo
          </Button>

          <Button variant="contained" style={estilos}>
            Centro de aprendizaje
          </Button>

          <Button variant="contained" style={estilos} onClick={toEdit}>
            Editar mi información
          </Button>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loader />
  );
}
