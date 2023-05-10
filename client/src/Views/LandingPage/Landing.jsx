import React from "react";
import landingImage from "../../img/contencion-emocional-aqui-estoy-1024x683.jpeg";
import {
  Container,
  Typography,
  CardMedia,
  Grid,
  Slide,
  Fade,
} from "@mui/material";
import { styled } from "@mui/system";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "rgb(25, 21, 78)", // Verde fuerte
  fontWeight: 600,
}));

export default function Landing(props) {

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #FFFFFF 50%, #F5F5F5 50%)",
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
          p: 4,
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
            <CustomTypography variant="h3" align="left" gutterBottom>
              Aquí estoy! Plataforma de turnos
            </CustomTypography>
          </Slide>
          <Slide direction="up" in={true} timeout={1000}>
            <CustomTypography variant="subtitle1" align="center" gutterBottom>
              Te ayudamos a que ayudes
            </CustomTypography>
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
        <Fade in={true} timeout={2000}>
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
        </Fade>
      </Grid>
    </Grid>
  );
}
