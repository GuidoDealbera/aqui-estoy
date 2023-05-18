import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCompanionsAtCharge } from "../../Redux/Actions/viewActions";
import Cards from "./Cards";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styles from "../Perfiles/SuperAdmin/SuperAdminStyle";

export default function CompanionsAtCharge() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { companionAtCharge } = useSelector((state) => state.view);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getCompanionsAtCharge(user.id));
  }, []);
  companionAtCharge= companionAtCharge?.filter((comp)=>comp.name&&comp.lastName)
  const myDate = new Date();
  const myTimeZone = myDate.toString().match(/([\+-][0-9]+)/)[1];
  const myHours = myDate.getHours();
  const myMinutes = myDate.getMinutes();
  const email = companionAtCharge.map((comp) => {
    return {
      email: comp.email,
    };
  });
  const handleExportEmail = () => {
    const csv = Papa.unparse(email);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "acompa_emails.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography display="block" variant="h6" marginLeft={"3vw"}>
          Acompañantes a mi Cargo
        </Typography>
      </Grid>
      <Grid container 
      width={"100%"} display={"flex"} 
      justifyContent={"center"}
      marginTop={2}
      >
        <Grid item
        flex={4}
        marginLeft={2}
        >
        <Button
          variant="contained"
          size="small"
          startIcon={<ArrowBackIcon />}
          sx={{ ...styles.buttons, backgroundColor: "#00C8B2", color: "black", marginTop: "3%", "&:hover": { backgroundColor: "#008B7C" } }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Regresar
        </Button>
        </Grid>

        <Grid item 
        flex={6}
        >
        <Tooltip title="Exporta un archivo CSV con la lista de correos de los acompañantes a mi cargo">
          <Button variant="outlined" 
          flex={8} 
          onClick={handleExportEmail}>
            Exportar Lista de Correos CSV
          </Button>
        </Tooltip>
        </Grid>
      </Grid>
      <Box
        key={user.id}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "2vw",
          justifyContent: "center",
          height: "85vh",
          width: "100vw",
        }}
      >
        {companionAtCharge?.map((e) => {
          const eTimeZone =
            Number(e.CityTimeZone?.offSet.toString().slice(-6, -3)) * 100;
          let horaLoc =
            Number(myHours) + (Number(eTimeZone) - Number(myTimeZone)) / 100;
          horaLoc >= 24 ? (horaLoc = horaLoc - 24) : null;
          horaLoc =
            (horaLoc < 10 ? `0${horaLoc}` : horaLoc) +
            ":" +
            (myMinutes < 10 ? `0${myMinutes}` : myMinutes);

          return (
            <Grid item xs={11} sm={6} md={4} lg={3} key={e.id}>
              <Cards
                key={e?.id}
                id={e?.id}
                name={e?.name}
                lastName={e?.lastName}
                profilePhoto={e?.profilePhoto}
                phone={e?.phone}
                email={e?.email}
                country={e?.country}
                horaLocal={horaLoc}
              />
            </Grid>
          );
        })}
      </Box>
    </Grid>
  );
}
