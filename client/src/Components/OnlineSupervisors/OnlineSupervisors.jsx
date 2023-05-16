import { Avatar, Badge, Box, Button, Typography, styled } from "@mui/material";
import { useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const styles = {
  buttons: {
    margin: "1%",
    color: "white",
    backgroundColor: "#1E1C4E",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #C8CCD8",
    "&:hover": {
        color: "white",
        backgroundColor: "#4A235A"
    }
  }
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
    },
  },
}));

export default function OnlineSupervisors({onClose}) {
  const { supervisorsOnline} = useSelector((state) => state.auth);
  return supervisorsOnline.length && (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        padding: "7%",
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "20px"
      }}
    >
      {supervisorsOnline.Supervisors?.map((sol) => {
        return (
          <Box
            key={sol.id}
            sx={{
              display: "flex",
              border: "1px solid lightgrey",
              borderRadius: "5px",
              padding: "5px",
              fontFamily: "poppins",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="p" sx={{ alignContent: "center", marginRight: "50px" }}>
              {sol.name} {sol.lastName}
            </Typography>
            <Box sx={{display: "flex", alignItems: "center"}}>
              <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot">
            <Avatar
              id="profile-button"
              alt={sol.name}
              src={sol.profilePhoto}
              sx={{
                //marginLeft: "50px",
                alignItems: "center",
              }}
            />
            </StyledBadge>
            <WhatsAppIcon sx={{ color: "green", paddingLeft: "8px" }} />
            </Box>
          </Box>
        );
      })}
      <Box sx={{display: "flex", justifyContent: "flex-end"}}>
      <Button variant="contained" sx={{...styles.buttons, width: "40%",marginTop: 2, textAlign: "end"}} onClick={onClose}>
        Aceptar
      </Button>
      </Box>
    </Box>
  );
}
