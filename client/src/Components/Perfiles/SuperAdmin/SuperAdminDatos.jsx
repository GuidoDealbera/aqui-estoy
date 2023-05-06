import {
  Button,
  Box,
  Avatar,
  Typography,
  Grid,
  CardMedia,
} from "@mui/material";

import image from "../../../img/xdlogo.png";
import { width } from "@mui/system";

export default function SuperAdminDatos(props) {
  const { user } = props;
  return (
    <Box>
      <Grid
        container
        sx={{
          background: "linear-gradient(to top, #ffffff, #ffffff, #EEEFF3)",
        }}
        justifyContent="center"
      >
        <Grid
          item
          sx={{
            flexDirection: "column",
            marginTop: "1rem",
            boxShadow: "3px 3px 5px #C8CCD8",
            background: "linear-gradient(to top,#EEEFF3, #ffffff, #ffffff )",
          }}
          xs={12}
          sm={4}
        >
          <Grid
            item
            marginTop={7}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              
            }}
          >
            <Avatar
              alt={user?.name}
              src={user?.profilePhoto}
              sx={{ width: 170, height: 170 }}
              justifyContent="center"
            />
            <Typography variant="h3">
              {user?.name.charAt(0).toUpperCase() +
                user?.name.slice(1) +
                " " +
                user?.lastName.charAt(0).toUpperCase() +
                user?.lastName.slice(1)}
            </Typography>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" margin={1}>
                {user?.country}
              </Typography>
              <Typography variant="h6" margin={1}>
                {user?.timeZone}
              </Typography>
              <Typography variant="h6" margin={1}>
                {user?.email}
              </Typography>
              <Typography variant="h6" margin={1}>
                {user?.phone}
              </Typography>
              <Typography variant="h6" margin={1}>
                {user?.profession}
              </Typography>
              <Typography variant="h6" margin={1}>
                {user?.studies}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                
              }}
            >
              <CardMedia
                xs={12}
                sm={5}
                component="img"
                style={{ height: "50%", width: "50%" }}
                image={image}
                alt="aquiEstoy"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
