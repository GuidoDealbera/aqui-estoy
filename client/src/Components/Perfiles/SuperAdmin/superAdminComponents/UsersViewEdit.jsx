import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Paper, TableContainer, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ModalEdit from "../../../Modals/ModalEdit";
import EditIcon from '@mui/icons-material/Edit';
import {
  getAllCompanions,
  getAllSupervisors,
} from "../../../../Redux/Actions/viewActions";

function UsersViewEdit(props) {
  const dispatch = useDispatch();
  let companionsData = useSelector((state) => state.view.allCompanions);
  let supervisorsData = useSelector((state) => state.view.allSupervisors);
  let usrRol = null;
  const [edit, setEdit] = useState(false);
  const [rowID, setRowID] = useState("");
  const handleEdit = () => {
    setEdit(true);
  };
  const handleClose = () => {
    setEdit(false);
  };
  useEffect(() => {
    dispatch(getAllCompanions());
    dispatch(getAllSupervisors());
  }, [dispatch]);
  companionsData = companionsData.map((usr) => {
    let mentor = `${usr.Supervisor?.name} ${usr.Supervisor?.lastName}`;
    mentor.toString() === "undefined undefined"
      ? (mentor = "---Sin Asignar")
      : null;

    usr.rol === "Companion2"
      ? (usrRol = "Acompañante Avanzado")
      : (usrRol = "Acompañante Inicial");
    
    return {
      id: usr.id,
      name: usr.name || " ",
      lastName: usr.lastName || " ",
      email: usr.email || " ",
      birthdayDate: usr.birthdayDate || " ",
      nationality: usr.nationality || " ",
      country: usr.country || " ",
      phone: usr.phone || " ",
      profession: usr.profession || " ",
      studies: usr.studies || " ",
      gender: usr.gender || " ",
      rol: usrRol || " ",
      isActiveText: usr.isActive ? "Si" : "No",
      shifts: usr.CompanionShifts?.length || 0,
      referente: mentor,
    };
  });

  supervisorsData = supervisorsData.map((usr) => {
    let mentor = `${usr.Supervisor?.name} ${usr.Supervisor?.lastName}`;
    mentor.toString() === "undefined undefined"
      ? (mentor = "---Sin Asignar")
      : null;

    usr.rol === "SuperAdmin"
      ? (usrRol = "Super Admin")
      : (usrRol = "Supervisor");
      
    return {
      id: usr.id,
      name: usr.name || " ",
      lastName: usr.lastName || " ",
      email: usr.email || " ",
      birthdayDate: usr.birthdayDate || " ",
      nationality: usr.nationality || " ",
      country: usr.country || " ",
      phone: usr.phone || " ",
      profession: usr.profession || " ",
      studies: usr.studies || " ",
      gender: usr.gender || " ",
      rol: usrRol || " ",
      isActiveText: usr.isActive ? "Si" : "No",
      shifts: usr.SupervisorShifts?.length || 0,
      referente: mentor,
    };
  });
  let usersData = [...companionsData, ...supervisorsData];

  const columns = [
    {
      field: "edit",
      headerName: "Editar",
      description: "Edición del Estado y Rol del usuario",
      sortable: false,
      width: 60,
      renderCell: () => (
        <EditIcon onClick={handleEdit} style={{ cursor: "pointer" }} />
      ),
    },
    {
      field: "isActiveText",
      headerName: "ACTIVO",
      description: "Describe si el usuario está activo en la plataforma",
      sortable: true,
      width: 80,
    },
    {
      field: "rol",
      headerName: "ROL",
      description: "Rol del usuario en la fundación",
      sortable: true,
      width: 200,
    },
    {
      field: "name",
      headerName: "NOMBRE",
      description: "",
      sortable: true,
      width: 160,
    },
    {
      field: "lastName",
      headerName: "APELLIDO",
      description: "",
      sortable: true,
      width: 160,
    },
    {
      field: "email",
      headerName: "CORREO",
      description: "",
      sortable: false,
      width: 250,
    },
    {
      field: "phone",
      headerName: "TELÉFONO",
      description: "",
      sortable: false,
      width: 150,
    },
    {
      field: "shifts",
      headerName: "TURNOS",
      description: "Cantidad de turnos",
      sortable: true,
      width: 80,
      align: "center"
    },
    {
      field: "referente",
      headerName: "REFERENTE",
      description: "Supervisor Mentor",
      sortable: true,
      width: 220,
    },
    {
      field: "country",
      headerName: "PAÍS",
      description: "País de residencia actual",
      sortable: true,
      width: 120,
    },
    {
      field: "nationality",
      headerName: "NACIONALIDAD",
      description: "País de nacimiento",
      sortable: true,
      width: 120,
    },
    {
      field: "birthdayDate",
      headerName: "FECHA NACIMIENTO",
      description: "",
      sortable: false,
      width: 160,
    },
    {
      field: "profession",
      headerName: "PROFESIÓN",
      description: "",
      sortable: true,
      width: 120,
    },
    {
      field: "studies",
      headerName: "ESTUDIOS",
      description: "",
      sortable: true,
      width: 120,
    },
    {
      field: "gender",
      headerName: "GENERO",
      description: "",
      sortable: true,
      width: 130,
    },
  ];

  const handleCellClick = (params, event) => {
    setRowID(params.id);
  };

  const sortByActive = (a, b) => {
    const activeA = a.isActiveText;
    const activeB = b.isActiveText;
    if (activeA < activeB) {
      return 1;
    }
    if (activeA > activeB) {
      return -1;
    }
    return 0;
  };

  const help = () => {};

  return (
    <Box>
      <Typography variant="h5" sx={{ margin: "2vw", textAlign: "center" }}>
        Ver / Editar Usuarios
      </Typography>

      <Grid container justifyContent="center">
        <Grid item>
          <TableContainer
            component={Paper}
            sx={{ width: "96vw", margin: "2vw", marginTop: 0 }}
          >
            <Paper variant="outlined" />

            <DataGrid
              rows={usersData.sort(sortByActive)}
              columns={columns}
              showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                  //how many rows are shown when first loads the table
                  //pageSize must be included in pageSizeOptions array
                },
              }}
              pageSizeOptions={[5, 10]}
              //options for the user to choose on how many rows the table has
              onCellClick={handleCellClick}
            />
          </TableContainer>
        </Grid>
        {edit && (
          <ModalEdit edit={edit} handleClose={handleClose} userID={rowID} />
        )}
      </Grid>
    </Box>
  );
}
export default UsersViewEdit;
