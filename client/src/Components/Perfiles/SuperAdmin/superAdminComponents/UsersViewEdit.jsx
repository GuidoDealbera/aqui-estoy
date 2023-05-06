import Box from "@mui/material/Box";
import { toast } from "sonner";
import { toastSuccess, toastError } from "../../../../Redux/Actions/alertStyle";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, Paper, TableContainer, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function UsersViewEdit(props) {
  let companionsData = useSelector((state) => state.view.allCompanions);
  let supervisorsData = useSelector((state) => state.view.allSupervisors);
  let usrRol = null;

  //Aqui se limpia la info para exportar los campos deseados
  companionsData = companionsData.map((usr) => {
    usr.isSuperCompanion ? (usrRol = "Companion-2") : (usrRol = "Companion-1");
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
      isActiveText: (usr.isActive? 'Si' : 'No'),
    };
  });
  supervisorsData = supervisorsData.map((usr) => {
    usr.isSuperAdmin ? (usrRol = "Superadmin") : (usrRol = "Supervisor");
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
      isActiveText: (usr.isActive? 'Si' : 'No'),
    };
  });
  const usersData = [...companionsData, ...supervisorsData];

  const handleClick = (row) => {
    toast.error(`Pronto podrás editar a ${row}! 😉`, toastError);
  };

  const columns = [
    // {
    //   field: "id",
    //   headerName: "N",
    //   description: "",
    //   sortable: true,
    //   width: 160,
    //   // valueGetter: (params) =>
    //   //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    // },
    {
      field: "isActiveText",
      headerName: "CUENTA ACTIVA",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "rol",
      headerName: "ROL",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "name",
      headerName: "NOMBRE",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "lastName",
      headerName: "APELLIDO",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "email",
      headerName: "CORREO",
      description: "",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "phone",
      headerName: "TELÉFONO",
      description: "",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "country",
      headerName: "PAÍS",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "nationality",
      headerName: "NACIONALIDAD",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "birthdayDate",
      headerName: "FECHA DE NACIMIENTO",
      description: "",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "profession",
      headerName: "PROFESIÓN",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "studies",
      headerName: "ESTUDIOS",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "gender",
      headerName: "GENERO",
      description: "",
      sortable: true,
      width: 160,
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    
  ];

  function handleRowSelection(ids) {
    console.log(ids);
    //Este arreglo contiene los ids de las celdas seleccionadas
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
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
              rows={usersData}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                  //how many rows are shown when first loads the table
                  //pageSize must be included in pageSizeOptions array
                },
              }}
              pageSizeOptions={[5, 10]}
              //options for the user to choose on how many rows the table has
              checkboxSelection={true}
              onRowSelectionModelChange={(ids) => handleRowSelection(ids)}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
export default UsersViewEdit;
