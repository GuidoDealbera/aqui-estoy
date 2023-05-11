import React, { useRef } from "react";
import Papa from "papaparse";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { toast } from "sonner";
import { toastSuccess, toastError } from "../../../../Redux/Actions/alertStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  postSupervisor,
  postCompanion,
} from "../../../../Redux/Actions/postPutActions";

//el archivo CSV debe contener las siguientes columnas:
// correo : un email
// clave : con minimo 6 caracteres
// rol : a-acomp1 b-acomp2 s-supervisor t-superadmin
// El usuario se crea siempre activo

const CsvImportExport = () => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
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
      isActive: usr.isActive,
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
      isActive: usr.isActive,
    };
  });
  const usersData = [...companionsData, ...supervisorsData];

  //--------------------------------------------------------------------
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        let newPeople = results.data;
        console.log(newPeople);
        //array de obj con acompanantes y supervisores
        //{clave: "xxx6", correo: "xxx@xxx.xx", rol: "a||A||s||S"}

        newPeople.forEach((usr) => {
          if (usr.clave.length > 5) {
            if (usr.rol.toLowerCase() === "a") {
              //acompañante 1
              dispatch(
                postCompanion({
                  email: usr.correo,
                  password: usr.clave,
                  isActive: true,
                  rol: "Companion1",
                })
              );
            } else if (usr.rol.toLowerCase() === "b") {
              //acompañante 2
              dispatch(
                postCompanion({
                  email: usr.correo,
                  password: usr.clave,
                  isActive: true,
                  rol: "Companion2",
                })
              );
            } else if (usr.rol.toLowerCase() === "s") {
              //supervisor
              dispatch(
                postSupervisor({
                  email: usr.correo,
                  password: usr.clave,
                  isActive: usr.activo,
                  rol: "Supervisor",
                })
              );
            } else if (usr.rol.toLowerCase() === "t") {
              //super admin
              dispatch(
                postSupervisor({
                  email: usr.correo,
                  password: usr.clave,
                  isActive: usr.activo,
                  rol: "SuperAdmin",
                })
              );
            } else {
              //error en la declaracion del tipo de usuario
              toast.error(`Error en el rol de ${usr.correo}`, toastError);
            }
          } else {
            toast.error(`Error en la contraseña de ${usr.correo}`, toastError);
          }
        });
      },
    });
  };

  //--------------------------------------------------------------------
  const handleExportCsv = () => {
    const csv = Papa.unparse(usersData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "usuarios.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //--------------------------------------------------------------------
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  //--------------------------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    // implementar la lógica para crear el usuario, como llamar a una API o usar acciones de Redux
    console.log(userData);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
        Importar/Exportar Usuarios por CSV
      </Typography>
      <Grid container justifyContent="center">
        <Grid item justifyContent="center" sx={{ width: "40vw" }}>
          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <input
                type="file"
                accept=".csv"
                ref={fileInput}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="csv-input"
              />
              <label htmlFor="csv-input">
                <TextField
                  label="Seleccionar archivo CSV"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  onClick={(e) =>
                    fileInput.current ? fileInput.current.click() : null
                  }
                />
              </label>
            </Box>
            <Box marginBottom={2}>
              <Button
                variant="contained"
                onClick={handleExportCsv}
                color="primary"
              >
                Exportar CSV
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CsvImportExport;
