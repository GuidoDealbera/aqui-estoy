import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useNavigate } from "react-router-dom";

export default function MultiActionAreaCard(props) {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: "20vw",
        minHeight: "25vw",
        margin: "1vw",
        boxShadow: "2px 2px 2px",
        // bgcolor:"#C8CCD8"
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          style={{ height: "20vw", width: "100%" }}
          image={props.profilePhoto}
          alt={props.name}
        />
        <CardContent sx={{ textAlign: "center" }}>
          <Typography gutterBottom variant="h5" component="div">
            {props.name + " " + props.lastName}
          </Typography>
          <Typography
            display="block"
            variant="h7"
            marginTop={"1vw"}
            marginBottom={"2vw"}
            color="text.secondary"
          >
            {props.email}
          </Typography>
          <Typography
            display="block"
            variant="h7"
            marginTop={1}
            color="text.secondary"
            fontSize="small"
          >
            Ubicación: {props.country}
          </Typography>
          <Typography
            display="block"
            variant="h7"
            marginTop={1}
            color="text.secondary"
            fontSize="small"
          >
            Hora Local: {props.horaLocal}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: "center", position: "relative" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate(`/profile/${props.id}/view`);
          }}
        >
          Ver Perfil
        </Button>
        <a href={`https://wa.me/${props.phone}`} target="_blank" style={{margin: 1}}>
        <WhatsAppIcon
          sx={{
            position: "absolute",
            backgroundColor: "green",
            color: "white",
            padding: 0.1,
            borderRadius: "30px",
            right: 10,
            bottom: 12,
            "&:hover": { boxShadow: "0 0 10px green",
          cursor: 'pointer' },
          }}
        />
        </a>
      </CardActions>
    </Card>
  );
}
