import { Button, Box, Avatar, Typography, Grid, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
import styles from "./SuperAdminStyle";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function SuperAdminDatos(props) {
  const theme = useTheme();
  const { user } = props;
  const navigate = useNavigate();
  const toEdit = () => {
    navigate(`/profile/${user.id}/edit`);
  };
  return Object.entries(user).length > 0 ? (
    <Box>
      <Grid
        container
        sx={{
          ...styles.container,
          [theme.breakpoints.down("sm")]: { paddingTop: "20px" },
        }}
        maxWidth="false"
      >
        <Grid item sx={styles.header} sm={10} md={5}>
          <Avatar sx={styles.header.avatar} src={user.profilePhoto} />
          <Typography variant="h5">
            {user.name} {user.lastName}
          </Typography>
          
          <Button variant="outlined" sx={{...styles.buttons, backgroundColor: "#00C8B2",color: "black", marginTop:"3%", "&:hover":{backgroundColor: "#008B7C"}}} onClick={toEdit}>
            Editar perfil
          </Button>
        
        </Grid>
        <Grid item sx={styles.body} sm={10} md={6}>
          <Box sx={{ ...styles.body.info, borderTop: "none" }} id="primero">
            <Typography sx={styles.body.info.label}>
              Correo electrónico
            </Typography>
            <Typography sx={styles.body.info.data}>{user.email}</Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>Teléfono</Typography>
            <Typography
              component="a"
              href={`https://wa.me/${user.phone}`}
              target="_blank"
              sx={styles.body.info.data}
            >
              {user.phone} <WhatsAppIcon/>
            </Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>Nacionalidad</Typography>
            <Typography sx={styles.body.info.data}>
              {user.nationality}
            </Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>Profesión</Typography>
            <Typography sx={styles.body.info.data}>
              {user.profession}
            </Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>Estudios</Typography>
            <Typography sx={styles.body.info.data}>{user.studies}</Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>
              Fecha de nacimiento
            </Typography>
            <Typography sx={styles.body.info.data}>
              {user.birthdayDate}
            </Typography>
          </Box>
          <Box sx={styles.body.info}>
            <Typography sx={styles.body.info.label}>Género</Typography>
            <Typography sx={styles.body.info.data}>{user.gender}</Typography>
          </Box>
        </Grid>
      </Grid>
        <Box sx={styles.box}>
          <Button sx={styles.buttons} onClick={() => {navigate("/calendarSuperAdmin")}}>Horario de supervisión</Button>
          <Button sx={styles.buttons} onClick={() => {navigate("/companionsAtCharge")}}>Acompañantes a mi cargo</Button>
          <Button sx={styles.buttons} onClick={() => {navigate("/panel-supervision")}}>Panel de supervisión</Button>
        </Box>
      
    </Box>
  ) : (
    <Loader />
  );
}
