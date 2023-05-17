import { Button, Box, Avatar, Typography, Grid, useTheme, ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import styles from './SupervisorStyles'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import EditIcon from '@mui/icons-material/Edit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GroupsIcon from "@mui/icons-material/Groups";
import DateRangeIcon from '@mui/icons-material/DateRange';
import ProfileEdit from "../../Modals/ProfileEdit";
import { useState } from "react";

export default function Supervisor(props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = props;
  const [edit, setEdit] = useState(false);
  const handleClose = () => {
    setEdit(false)
  }
  const myDate = new Date();
  const myHours = myDate.getHours();
  const myMinutes = myDate.getMinutes();

  return Object.entries(user).length > 0 ? (
    <Box>
      <Grid container sx={{...styles.container, [theme.breakpoints.down('sm')]: { paddingTop: 0 }}}>
        <Grid item sx={styles.header} sm={10} md={5}>
        <Avatar sx={styles.header.avatar} src={user.profilePhoto} />
        <Typography variant="h5">{user.name} {user.lastName}</Typography>
        <Typography variant="h7" sx={{...styles.body.info.data, fontFamily: 'poppins'}}>{user.rol}</Typography>
        <Button startIcon={<EditIcon/>} sx={{...styles.buttons, backgroundColor: "#00C8B2",color: "black", "&:hover":{backgroundColor: "#008B7C"}}} onClick={()=>setEdit(true)}>Editar perfil</Button>
        </Grid>
        <Grid item sx={styles.body} sm={10} md={5}>
        <Box sx={{ ...styles.body.info, borderTop: "none" }} id="primero">
          <Typography sx={styles.body.info.label}>Correo electrónico</Typography>
          <Typography sx={styles.body.info.data}>{user.email}</Typography>
        </Box>
        <Box sx={styles.body.info}>
                    <Typography sx={styles.body.info.label}>Teléfono</Typography>
                    <Typography sx={styles.body.info.data}>{user.phone} <WhatsAppIcon/></Typography>
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
          <Button startIcon={<CalendarMonthIcon/>} sx={styles.buttons} onClick={() => {navigate("/calendarSuperAdmin")}}>Calendario Supervisores</Button>
          <Button startIcon={<CalendarMonthIcon/>} sx={styles.buttons} onClick={() => {navigate("/calendarCompanion")}}>Calendario Acompañantes</Button>
          <Button startIcon={<GroupsIcon/>} sx={styles.buttons} onClick={() => {navigate("/companionsAtCharge")}}>Acompañantes a mi cargo</Button>
          <Button startIcon={<DateRangeIcon/>} sx={styles.buttons} onClick={() => {navigate("/panel-supervision")}}>Panel de supervisión</Button>
        </Box>
        {edit && <ProfileEdit edit={edit} handleClose={handleClose} />}
    </Box>
  ) : (
    <Loader />
  );
}
