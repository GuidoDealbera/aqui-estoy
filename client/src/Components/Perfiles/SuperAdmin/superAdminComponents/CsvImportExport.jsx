import React, { useRef, useState } from "react";
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
import { margin } from "@mui/system";

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
  const [csvErrors, setCsvErrors] = useState({});
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

  let errors = {};
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
              // errors = csvErrors;
              errors[usr.correo] = "Error en el rol del usuario";
              // setCsvErrors(errors);
              toast.error(`Error en el rol de ${usr.correo}`, toastError);
            }
          } else {
            // errors = csvErrors;
            errors[usr.correo] = "Error en la contraseña";
            // setCsvErrors(errors);
            toast.error(`Error en la contraseña de ${usr.correo}`, toastError);
          }
        });
        setCsvErrors(errors);
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
    <Box 
    // border={1} 
    // borderColor={"red"}
    >
      <Typography variant="h5" sx={{ textAlign: "center", margin: "2vw" }}>
        Importar/Exportar Usuarios por CSV
      </Typography>

      <Grid
        container
        // border={1}
        // borderColor={"green"}
        justifyContent="center"
      >
        <Grid
          item
          // border={1}
          // borderColor={"blue"}
        >
          {/* <form onSubmit={handleSubmit}> */}
            <Box marginBottom={2} justifyContent={"center"}>
              <input
                type="file"
                accept=".csv"
                ref={fileInput}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                id="csv-input"
              />
              {/* <label htmlFor="csv-input">
                <TextField
                  label="Importar archivo CSV"
                  fullWidth
                  InputProps={{ readOnly: true }}
                  onClick={(e) =>
                    fileInput.current ? fileInput.current.click() : null
                  }
                />
              </label> */}
              <Button
              sx={{margin:"1vw"}}
                variant="contained"
                onClick={(e) =>
                  fileInput.current ? fileInput.current.click() : null
                }
                color="primary"
              >
                Importar CSV
              </Button>
              {/* </Box>
            <Box marginBottom={2}> */}
              <Button
                variant="contained"
                onClick={handleExportCsv}
                color="primary"
              >
                Exportar CSV
              </Button>
            </Box>
          {/* </form> */}
        </Grid>
      </Grid>

      <Grid
        container
        // border={1}
        // borderColor={"red"}
        justifyContent={"space-evenly"}
        padding={"2vw"}
      >
        {Object.keys(csvErrors).length === 0 ? (
          <Grid
            item
            border={1}
            borderColor={"lightGray"}
            width={"70vw"}
            padding={"1vw"}
            color={"gray"}
          >
            <Typography textAlign={"center"}>
              ESTRUCTURA DEL ARCHIVO CSV:
            </Typography>
            <Typography>
              El archivo debe contener las siguientes columnas, conservando el
              nombre como se muestra a continuación:
            </Typography>
            <Typography>correo : el correo electrónico del usuario</Typography>
            <Typography>
              clave : debe tener un minimo de 6 caracteres
            </Typography>
            <Typography>rol : puede tener los siguientes valores:</Typography>
            <Typography>a -Acompañante 1</Typography>
            <Typography>b -Acompañante 2</Typography>
            <Typography>s -Supervisor</Typography>
            <Typography>t -Super Admin</Typography>
          </Grid>
        ) : (
          <Grid item border={1} borderColor={"red"}>
            <Typography width={"70vw"} textAlign={"center"} color={"red"}>
              HUBO ERRORES IMPORTANDO ALGUNOS USUARIOS:
            </Typography>
            <br></br>
            {Object.keys(csvErrors).map((em) => {
              return (
                <Typography width={"70vw"} textAlign={"center"} color={"red"}>
                  {em} : {csvErrors[em]}
                </Typography>
              );
            })}
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default CsvImportExport;
