import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";
import { toastSuccess, toastError } from "../../../../Redux/Actions/alertStyle";

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
  Typography
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
      country: usr.country,
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
  console.log(usersData[8]);

  const handleClick = (row) => {
    toast.error(`Pronto podrás editar a ${row}! 😉`, toastError);
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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Box>
      <Typography variant="h5" sx={{textAlign:"center", margin:"2vw"}}>
      Ver / Editar Usuarios</Typography>
      <Grid container justifyContent="center">
        <Grid item>
          <TableContainer component={Paper} sx={{width:"96vw", margin:"2vw", marginTop:0}}>
            <Paper variant="outlined" />
            <Table >
              <TableHead>
                <TableRow>
                  <StyledTableCell ></StyledTableCell>
                  <StyledTableCell align="center">ROL</StyledTableCell>
                  <StyledTableCell align="center">NOMBRE</StyledTableCell>
                  <StyledTableCell align="center">APELLIDO</StyledTableCell>
                  <StyledTableCell align="center">CORREO</StyledTableCell>
                  <StyledTableCell align="center">TELÉFONO</StyledTableCell>
                  <StyledTableCell align="center">PAIS</StyledTableCell>
                  <StyledTableCell align="center">NACIONALIDAD</StyledTableCell>
                  <StyledTableCell align="center">
                    FECHA DE NACIMIENTO
                  </StyledTableCell>
                  <StyledTableCell align="center">PROFESIÓN</StyledTableCell>
                  <StyledTableCell align="center">ESTUDIOS</StyledTableCell>
                  <StyledTableCell align="center">GÉNERO</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody >
                {usersData.map((usr) => (
                  <StyledTableRow hover>
                    <TableCell onClick={() => handleClick(usr.email)}>
                      <Button variant="outlined">EDITAR</Button>
                    </TableCell>
                    <TableCell >{usr.rol}</TableCell>
                    <TableCell>{usr.name}</TableCell>
                    <TableCell>{usr.lastName}</TableCell>
                    <TableCell>{usr.email}</TableCell>
                    <TableCell>{usr.phone}</TableCell>
                    <TableCell>{usr.country}</TableCell>
                    <TableCell>{usr.nationality}</TableCell>
                    <TableCell>{usr.birthdayDate}</TableCell>
                    <TableCell>{usr.profession}</TableCell>
                    <TableCell>{usr.studies}</TableCell>
                    <TableCell>{usr.gender}</TableCell>
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
