import {
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";
import image from "../../../img/xdlogo.png";
import { width } from "@mui/system";

export default function SuperAdminDatos(props) {
  const { user } = props;

    const estilos = {
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    width: "100%",
    height: "100%",
    boxShadow: "5px 5px 5px #C8CCD8"
  };

  return (
    <Box>
      <Grid
        container
        margin={"auto"}
        marginTop={"3vw"}
        sx={{
          width: "60vw",
          flexDirection: "row",
          justifyContent: "center",
          // borderColor: "red",
          // borderStyle: "solid",
        }}
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            width: "50vw",
            // borderColor: "#1E1C4E",
            // borderStyle: "solid",
            borderRadius: "5%",
            boxShadow:"2px 3px 5px #1E1C4E"
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
                // borderColor: "blue",
                // borderStyle: "solid",
              }}
            />
            <Typography variant="h5" textAlign="center">
              {user?.name?.charAt(0).toUpperCase() +
                user?.name?.slice(1) +
                " " +
                user?.lastName?.charAt(0).toUpperCase() +
                user?.lastName?.slice(1)}
            </Typography>
          </Grid>

          <Grid item textAlign={"center"}>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.country}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.timeZone}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.email}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.phone}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.profession}
            </Typography>
            <Typography display="block" variant="h6" marginTop={1}>
              {user?.studies}
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
            // borderColor: "violet",
            // borderStyle: "solid",
          }}
        >
          <Grid
            item
            sx={{
              width: "90%",
              height: "30%",
              minHeight: "8vw",
              padding: "1vw",
              // borderColor: "blue",
              // borderStyle: "solid",
            }}
          >
            <Link to='/register'>
            <Button variant="outlined" style={estilos}>
              Editar mi información
            </Button>
            </Link>
            
          </Grid>
        </Grid>
      </Grid>

      {/* <CardMedia
                xs={12}
                sm={5}
                component="img"
                style={{ height: "50%", width: "50%" }}
                image={image}
                alt="aquiEstoy"
              /> */}
    </Box>
  );
}
