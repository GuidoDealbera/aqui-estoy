import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllCompanions,
  getAllSupervisors,
} from "../../Redux/Actions/viewActions";
import landingImage from "../../img/landing.png";
import {
  Button,
  Container,
  Typography,
  Box,
  CardMedia,
  Grid,
} from "@mui/material";

export default function Landing(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanions());
    dispatch(getAllSupervisors());
  }, []);

  // const toProfile = () => {
  //   navigate(`/profile/Chiringuito`);
  // };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          order: { xs: 2, md: 1 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3" align="left" gutterBottom>
            Aquí estoy! Plataforma de turnos
          </Typography>

          <Typography variant="h5" align="left" gutterBottom>
            En esta plataforma podrás agendar tu turno para tu voluntariado!.
          </Typography>

          <Typography variant="h5" align="left" gutterBottom>
            Si sos supervisor esta plataforma te servira para administrar los
            voluntarios a tu cargo.
          </Typography>

          {/* <Box mt={4} textAlign="left">
            <Button variant="contained" color="primary" onClick={toProfile}>
              Comenzar
            </Button>
          </Box> */}
        </Container>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          order: { xs: 1, md: 2 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={landingImage}
          alt="Landing illustration"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Grid>
    </Grid>
  );
}
