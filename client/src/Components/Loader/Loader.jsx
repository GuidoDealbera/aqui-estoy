import { Avatar, Box, Card, CardMedia, Fade, Slide } from "@mui/material";
import image from "../../img/xdlogo.png";
import styles from "./Loader.module.css";

export default function Loader(props) {
  return (
    <div className={styles.div}>
      <Box
        sx={{
          marginTop: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="Loading"
          name="Image"
          src={image}
          sx={{ width: 150, height: 100, padding: 2.5 }}
        />
      </Box>
      <Box sx={{ width: "10%", marginLeft: "45%"}}>
      <span className={styles.loader}></span>
      </Box>
    </div>
  );
}
