import { Button, Box, Avatar, Typography, Grid, useTheme, styled, Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import ProfileEdit from "../../Modals/ProfileEdit";
import { getSupervisorsOnline } from "../../../Redux/Actions/viewActions";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PersonIcon from '@mui/icons-material/Person';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import styles from "./CompanionProfile";
import { useState } from "react";
import SupervisorsOnline from "../../Modals/SupervisorsOnline";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    right: -8,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(3.5)',
      opacity: 0.1,
    },
  },
}));
export default function Companion(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allSupervisors = useSelector((state) => state.view.allSupervisors);
  const { loading } = useSelector((state) => state.auth);
  const loginUser = useSelector(state => state.auth.user);
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
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
  const { user } = props;
  const timeZone = loginUser.CityTimeZone;
  const handleOpen = () => {
    dispatch(getSupervisorsOnline(timeZone));
    setOpen(true);
  }
  const handleClose = () => {
    setEdit(false);
  };
  const closeOpen = () => {
    setOpen(false);
  }
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
  const newRol = (rol) => {
    return rol === 'Companion1' ? rol = 'Acompañante Inicial' : rol = 'Acompañante Avanzado'
  }
  return !loading ? (
    <Box>
    <Grid
      container
      sx={{
        ...styles.container,
        [theme.breakpoints.down("sm")]: { paddingTop: 0 },
      }}
      maxWidth="false"
    >
      <Grid item sx={styles.header} sm={10} md={5}>
        <Avatar sx={styles.header.avatar} src={user.profilePhoto} />
        <Typography variant="h5">{user.name} {user.lastName}</Typography>
        <Typography variant="h7" sx={{...styles.body.info.data, fontFamily: 'poppins'}}>{newRol(user.rol)}</Typography>
        {MentorName !== 'No asignado' && (
        <Box>
        <Typography sx={{...styles.body.info.label, marginTop: "1.5%"}}>Mentor: {user.Supervisor?.name} {user.Supervisor?.lastName}<a href={`https://wa.me/${superPhone.replace(/\D/g, '')}`} target="_blank"><WhatsAppIcon sx={styles.whatsApp}/></a></Typography>
        <Typography>Hora del mentor: {horaLoc} hs</Typography>
        </Box>
        )}
        <Button startIcon={<EditIcon/>} sx={{...styles.buttons, backgroundColor: "#00C8B2",color: "black", "&:hover":{backgroundColor: "#008B7C"}}} onClick={()=>setEdit(true)}>Editar perfil</Button>
      </Grid>
      <Grid item sx={styles.body} sm={10} md={5}>
        <Box sx={{ ...styles.body.info, borderTop: "none" }} id="primero">
          <Typography sx={styles.body.info.label}>Correo electrónico</Typography>
          <Typography sx={styles.body.info.data}>{user.email}</Typography>
        </Box>
        <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Teléfono</Typography>
                    <Typography sx={styles.body.info.data}>{user.phone} <WhatsAppIcon sx={{marginLeft: "5px"}}/></Typography>
                </Box>           
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Nacionalidad</Typography>
                    <Typography sx={styles.body.info.data}>{user.nationality}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Reside en</Typography>
                    <Typography sx={styles.body.info.data}>{user.country}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Huso horario</Typography>
                    <Typography sx={styles.body.info.data}>{user.CityTimeZone?.offSet}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Profesión</Typography>
                    <Typography sx={styles.body.info.data}>{user.profession}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Nivel de estudios alcanzado</Typography>
                    <Typography sx={styles.body.info.data}>{user.studies}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Fecha de nacimiento</Typography>
                    <Typography sx={styles.body.info.data}>{user.birthdayDate}</Typography>
                </Box>
                <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Género</Typography>
                    <Typography sx={styles.body.info.data}>{user.gender}</Typography>
                </Box>
      </Grid>
    </Grid>
    <Box sx={styles.box}>
    <Button startIcon={<AssignmentIcon/>} sx={styles.buttons} onClick={() => navigate("/calendarCompanion")}>Reserva de turnos</Button>
    <Button startIcon={<PersonIcon/>} sx={{...styles.buttons, width: "230px", paddingLeft: 0}} onClick={handleOpen}>Supervisores Online        
      <StyledBadge 
     overlap="circular"
     anchor={{ vertical: 'bottom', horizontal: 'right' }}
     variant="dot"
     sx={{paddingLeft: "8px"}}
    />
    </Button>
    <Button startIcon={<Diversity3Icon/>} href="https://app.go4clic.com/aqui-estoy-1" sx={styles.buttons}>Centro de aprendizaje</Button>
    </Box>
    {edit && <ProfileEdit edit={edit} handleClose={handleClose} />}
    {open && <SupervisorsOnline open={open} closeOpen={closeOpen}/>}
    </Box>
  ) : (
    <Loader />
  );
}