import { Button, Box, Avatar, Typography, Grid, Container } from "@mui/material";


export default function Companion(props) {
  const {user} = props
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #ffffff, #00C8B2)",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} alignItems="center" display="flex" flexDirection="column">
            <Avatar
              alt={user.name}
              src={user.profilePhoto}
              sx={{ width: 250, height: 250, marginBottom: 2 }}
            />

            <Typography variant="h4">
              {user.lastName}, {user.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.birthDate}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.nacionality}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.country}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.timeZone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.phone}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.profession}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.studies}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">{user.gender}</Typography>
          </Grid>

          <Grid item xs={12} display="flex" justifyContent="center" sx={{ marginTop: 3 }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              Reserva de turno de voluntariado
            </Button>
            <Button variant="contained" color="secondary">
              Centro de aprendizaje
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
