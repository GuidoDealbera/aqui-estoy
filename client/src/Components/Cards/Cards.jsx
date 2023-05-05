import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { border } from '@mui/system';
import { useNavigate } from 'react-router-dom';


export default function MultiActionAreaCard(props) {
const navigate = useNavigate();

return (
    <Card sx={{ maxWidth: 345, margin: "5%", boxShadow: "3px 3px 5px", bgcolor:"#C8CCD8"}} > 
      <CardActionArea>
        <CardMedia
          component="img"
          style={{height:"100%", width:"100%"}}
          image={props.profilePhoto}
          alt={props.name}
          
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" fontSize="small">
            {props.name + " " + props.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="small">
            {props.country}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => {navigate(`/profile/${props.id}/view`)}}>
          Ver Perfil
        </Button>
      </CardActions>
    </Card>
  );
}
