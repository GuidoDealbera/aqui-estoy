import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
    Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell, 
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useSelector } from "react-redux";

function UsersViewEdit(props) {
  let companionsData = useSelector((state) => state.view.allCompanions);
  let supervisorsData = useSelector((state) => state.view.allSupervisors);
  let usrRol = null;

  //Aqui se limpia la info para exportar los campos deseados
  companionsData = companionsData.map((usr) => {
    usr.isSuperCompanion ? (usrRol = "Companion-2") : (usrRol = "Companion-1");
    return {
      name: usr.name,
      lastName: usr.lastName,
      email: usr.email,
      birthdayDate: usr.birthdayDate,
      nationality: usr.nationality,
      country: usr.residence,
      phone: usr.phone,
      profession: usr.profession,
      studies: usr.studies,
      gender: usr.gender,
      rol: usrRol,
    };
  });
  supervisorsData = supervisorsData.map((usr) => {
    usr.isSuperAdmin ? (usrRol = "Superadmin") : (usrRol = "Supervisor");
    return {
      name: usr.name,
      lastName: usr.lastName,
      email: usr.email,
      birthdayDate: usr.birthdayDate,
      nationality: usr.nationality,
      country: usr.country,
      phone: usr.phone,
      profession: usr.profession,
      studies: usr.studies,
      gender: usr.gender,
      rol: usrRol,
    };
  });
  const usersData = [...companionsData, ...supervisorsData];

  const handleClick = (row) => {
    alert(`quieres editar ${row}?`);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  

  return (
    <Box>
      <h2>Ver / Editar Usuarios</h2>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow >
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center">NOMBRE</StyledTableCell>
                  <StyledTableCell align="center">APELLIDO</StyledTableCell>
                  <StyledTableCell align="center" >CORREO</StyledTableCell>
                  <StyledTableCell align="center">FECHA DE NACIMIENTO</StyledTableCell>
                  <StyledTableCell align="center">NACIONALIDAD</StyledTableCell>
                  <StyledTableCell align="center">PAIS</StyledTableCell>
                  <StyledTableCell align="center">TELÉFONO</StyledTableCell>
                  <StyledTableCell align="center">PROFESIÓN</StyledTableCell>
                  <StyledTableCell align="center">ESTUDIOS</StyledTableCell>
                  <StyledTableCell align="center">GÉNERO</StyledTableCell>
                  <StyledTableCell align="center">ROL</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((usr) => (
                  <StyledTableRow hover>
                    <TableCell onClick={() => handleClick(usr.email)}>
                        <Button variant="outlined">EDITAR</Button>
                    </TableCell>
                    <TableCell>{usr.name}</TableCell>
                    <TableCell>{usr.lastName}</TableCell>
                    <TableCell  >
                      {usr.email}
                    </TableCell>
                    <TableCell>{usr.birthdayDate}</TableCell>
                    <TableCell>{usr.nationality}</TableCell>
                    <TableCell>{usr.country}</TableCell>
                    <TableCell>{usr.phone}</TableCell>
                    <TableCell>{usr.profession}</TableCell>
                    <TableCell>{usr.studies}</TableCell>
                    <TableCell>{usr.gender}</TableCell>
                    <TableCell>{usr.rol}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
export default UsersViewEdit;
