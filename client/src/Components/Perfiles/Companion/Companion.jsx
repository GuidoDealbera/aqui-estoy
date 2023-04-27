import { voluntario } from "../../../data";
import { Button, Box, Avatar } from "@mui/material";

export default function Companion(props) {
  const user = voluntario[0];
  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #ffffff, #00C8B2)",
        height: "100vh",
      }}
    >
      <Avatar
        alt={user.name}
        src={user.profileImage}
        sx={{ width: 250, height: 250 }}
      />

      <h2>
        {user.lastName}, {user.name}
      </h2>
      <div>
        <h3>{user.birthDate}</h3>
        <h3>{user.nacionality}</h3>
        <h3>{user.country}</h3>
        <h3>{user.timeZone}</h3>
        <h3>{user.phone}</h3>
        <h3>{user.profession}</h3>
        <h3>{user.studies}</h3>
        <h3>{user.gender}</h3>
      </div>
      <Button>Reserva de turno de voluntariado</Button>
      <Button>Centro de aprendizaje</Button>
    </Box>
  );
}
