import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
  TextField,
  Box,
  Input,
} from "@mui/material";
import {
  putCompanion,
  putSupervisor,
} from "../../Redux/Actions/postPutActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./registerComponents/CountrySelect";
import TimezoneSelect from "./registerComponents/TimeZoneSelect";
import { toast } from "sonner";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { Container } from "@mui/system";
import {
  getAllCompanions,
  getAllSupervisors,
} from "../../Redux/Actions/viewActions";

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    height: "80vh",
    justifyContent: "center",
    alignItems: "center",
    form: {
      height: "500px",
      width: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "solid 1px",
      borderRadius: "5px",
      padding: "20px",
      marginTop: "10px",
      field: {
        width: "300px",
      },
      buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        marginTop: "auto",
        button: {
          margin: "10px",
        },
      },
    },
  },
};

export default function EditInfo() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const clickHandler = (event) => {
    const { target } = event;
    const { name } = target;
    switch (name) {
      case "Siguiente":
        setIndex(index + 1);
        break;

      case "Anterior":
        setIndex(index - 1);
        break;

      default:
        break;
    }
  };

  const submitHandler = (values) => {
    //Submit Handler del formulario (Aún no interactúa con el Back-End)
    console.log(values);
    if (user.rol === "Companion1" || user.rol === "Companion2") {
      dispatch(putCompanion(user.id, values)); //trae el id del user y lo actualiza
    
    } else {
      dispatch(putSupervisor(user.id, values));
   
    }
    toast.success("Datos actualizados", toastSuccess);
    navigate(`/profile/${user.id}`);
  };

  const validationSchema = Yup.object().shape({
    //Validaciones de Yup (Aún en desarrollo)
    profilePhoto: Yup.string().url("URL de la imágen inválida"),
    name: Yup.string()
      .max(15, "Debe ser menor a 15 caracteres")
      .required("Este campo es obligatorio"),
    lastName: Yup.string()
      .max(20, "Debe ser menor a 20 caracteres")
      .required("Este campo es obligatorio"),
    birthdayDate: Yup.date().required("Este campo es obligatorio"),
    nationality: Yup.string(),
    country: Yup.string(),
    cityTimeZone: Yup.string(),
    phone: Yup.string()
      .matches(
        /^\+?[0-9\s]*[1-9][0-9]*$/,
        "El número de teléfono debe contener solo números y espacios en blanco"
      )
      .test(
        "is-positive",
        "El número de teléfono debe ser positivo",
        (value) => !value || parseInt(value.replace(/\s+/g, "")) > 0
      ),
    studies: Yup.string(),
    gender: Yup.string(),
  });

  //Estas 3 páginas es simplemente código html dividido en 3 partes, para hacer el paginado de "Siguiente", "Anterior" (Mirar Figma)

  const firstPage = (
    <>
      <Box>
        <InputLabel>Foto de Perfil</InputLabel>
        <Field sx={styles.container.form.field} name="profilePhoto">
          {({ field, form }) => (
            <>
              <Input
                sx={{ width: "300px" }}
                disableUnderline
                id={field.name}
                name={field.name}
                type="file"
                onChange={async (event) => {
                  const file = event.target.files[0];
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", "mzntwjvh");

                  const response = await axios.post(
                    "https://api.cloudinary.com/v1_1/dqvz1juaf/image/upload",
                    formData
                  );
                  form.setFieldValue(field.name, response.data.url);
                }}
              />
            </>
          )}
        </Field>
        <ErrorMessage name="profilePhoto" sx={{ width: 300 }}>
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Nombre</InputLabel>
        <Field as={TextField} name="name" sx={styles.container.form.field} />
        <ErrorMessage name="name">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Apellido</InputLabel>
        <Field
          as={TextField}
          name="lastName"
          sx={styles.container.form.field}
        />
        <ErrorMessage name="lastName">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Fecha de Nacimiento</InputLabel>
        <Field
          as={TextField}
          name="birthdayDate"
          type="date"
          sx={styles.container.form.field}
        />
        <ErrorMessage name="birthdayDate">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box sx={styles.container.form.buttonContainer}>
        <Button name="Siguiente" onClick={clickHandler}>
          Continuar
        </Button>
      </Box>
    </>
  );

  const secondPage = (
    <>
      <Box>
        <InputLabel>Nacionalidad</InputLabel>
        <Field
          component={CountrySelect}
          name="nationality"
          sx={styles.container.form.field}
        ></Field>
        <ErrorMessage name="nationality">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Pais de residencia actual</InputLabel>
        <Field
          component={CountrySelect}
          name="country"
          sx={styles.container.form.field}
        ></Field>
        <ErrorMessage name="country">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Ciudad / huso horario de residencia</InputLabel>
        <Field
          sx={styles.container.form.field}
          component={TimezoneSelect}
          name="cityTimeZone"
        ></Field>
        <ErrorMessage name="cityTimeZone">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box sx={styles.container.form.buttonContainer}>
        <Button name="Anterior" onClick={clickHandler}>
          Volver
        </Button>
        <Button name="Siguiente" onClick={clickHandler}>
          Continuar
        </Button>
      </Box>
    </>
  );

  const thirdPage = (
    <>
      <Box>
        <InputLabel>Teléfono</InputLabel>
        <Field name="phone" as={TextField} sx={styles.container.form.field} />
        <ErrorMessage name="phone">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel
          sx={{
            fontSize: "13px",
            maxWidth: "300px",
            whiteSpace: "nowrap",
            overflow: "visible",
            textOverflow: "ellipsis",
          }}
        >
          ¿Estudias o trabajas en alguna de estas areas?
        </InputLabel>
        <Field as={Select} sx={styles.container.form.field} name="profession">
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="Psicólogo">Psicólogo</MenuItem>
          <MenuItem value="Psiquiatra">Psiquiatra</MenuItem>
          <MenuItem value="Counselor">Counselor</MenuItem>
          <MenuItem value="Coach">Coach</MenuItem>
          <MenuItem value="Asistente Social">Asistente Social</MenuItem>
          <MenuItem value="Acompañante Espiritual">
            Acompañante Espiritual
          </MenuItem>
          <MenuItem value="Estudiante">Estudiante</MenuItem>
          <MenuItem value="No">No</MenuItem>
        </Field>
        <ErrorMessage name="profession">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>Estudios alcanzados</InputLabel>
        <Field as={Select} sx={styles.container.form.field} name="studies">
          <MenuItem value="">Select an option</MenuItem>

          <MenuItem value="Secundario">Secundario</MenuItem>
          <MenuItem value="Terciario">Terciario</MenuItem>
          <MenuItem value="Universitario">Universitario</MenuItem>
          <MenuItem value="Postgrado">Postgrado</MenuItem>
        </Field>
        <ErrorMessage name="studies">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <InputLabel>¿Con qué genero te identificas?</InputLabel>
        <Field as={Select} sx={styles.container.form.field} name="gender">
          <MenuItem value="">Select an option</MenuItem>
          <MenuItem value="Mujer">Mujer</MenuItem>
          <MenuItem value="Mujer-trans">Mujer-trans</MenuItem>
          <MenuItem value="Hombre">Hombre</MenuItem>
          <MenuItem value="Hombre-trans">Hombre-trans</MenuItem>
          <MenuItem value="No-binario">No-binario</MenuItem>
          <MenuItem value="Otra identidad">Otra identidad</MenuItem>
          <MenuItem value="Prefiero no responder">
            Prefiero no responder
          </MenuItem>
        </Field>
        <ErrorMessage name="gender">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box sx={styles.container.form.buttonContainer}>
        <Button name="Anterior" onClick={clickHandler}>
          Volver
        </Button>
        <Button type="submit">Finalizar</Button>
      </Box>
    </>
  );
  return (
    <Container sx={styles.container}>
      <Typography variant="h5">Editar información</Typography>
      <Formik
        initialValues={{
          profilePhoto: user.profilePhoto,
          name: user.name,
          lastName: user.lastName,
          birthdayDate: user.birthdayDate,
          nationality: user.nationality,
          country: user.country,
          cityTimeZone: user.CityTimeZone.id,
          phone: user.phone,
          profession: user.profession,
          studies: user.studies,
          gender: user.gender,
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => {
          return (
            <Form sx={styles.form}>
              {index === 0 ? firstPage : null}
              {index === 1 ? secondPage : null}
              {index === 2 ? thirdPage : null}
              {props.errors && Object.keys(props.errors).length > 0 && (
                <Typography>
                  Hay errores en los campos. Por favor, revíselos.
                </Typography>
              )}
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
