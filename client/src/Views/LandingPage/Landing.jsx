import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getAllCompanions,
  getAllSupervisors,
} from "../../Redux/Actions/viewActions";
import landingImage from "../../img/contencion-emocional-aqui-estoy-1024x683.jpeg";
import {
  Button,
  Container,
  Typography,
  Box,
  CardMedia,
  Grid,
  Slide,
} from "@mui/material";

export default function Landing(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanions());
    dispatch(getAllSupervisors());
  }, []);

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
          <Slide direction="down" in={true} timeout={1000}>
            <Typography variant="h3" align="left" gutterBottom>
              Aquí estoy! Plataforma de turnos
            </Typography>
          </Slide>
          <Slide direction="up" in={true} timeout={1000}>
            <Typography variant="subtitle1" align="left" gutterBottom>
              Escríbenos para recibir apoyo emocional, humano y gratuito por Whatsapp ante lo que sea que estés viviendo.
            </Typography>
          </Slide>
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
        <Slide direction="right" in={true} timeout={1000}>
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
        </Slide>
      </Grid>
    </Grid>
  );
}
