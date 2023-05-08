import { Button, Box, Avatar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import Loader from "../../Loader/Loader";

export default function SuperAdminDatos(props) {
  const { user } = props;

  const estilos = {
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    boxShadow: "5px 5px 5px #C8CCD8",
  };

  return Object.entries(user).length > 0 ? (
    <Box>
      <Grid
        container
        margin={"auto"}
        marginTop={"3vw"}
        sx={{
          width: "60vw",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            width: "50vw",
            borderRadius: "5%",
            boxShadow: "2px 3px 5px #1E1C4E",
          }}
          xs={12}
          md={5}
        >
          <Grid item margin={1}>
            <Avatar
              alt={user?.name}
              src={user?.profilePhoto}
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
              {user.country}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.timeZone}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.email}
            </Typography>
            <Typography display="block" variant="h7" marginTop={1}>
             Super Admin
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.phone}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.profession}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user.studies}
            </Typography>
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
              height: "30%",
              minHeight: "8vw",
              padding: "1vw",
            }}
          >
            <Link to="/register">
              <Button variant="outlined" style={estilos}>
                Editar mi información
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : (
    <Loader />
  );
}
