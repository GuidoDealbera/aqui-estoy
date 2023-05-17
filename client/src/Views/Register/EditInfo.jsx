import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { styled } from "@mui/system";
import {
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  IconButton,
  LinearProgress,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  putCompanion,
  putSupervisor,
} from "../../Redux/Actions/postPutActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./registerComponents/CountrySelect";
import TimezoneSelect from "./registerComponents/TimeZoneSelect";
import { toast } from "sonner";
import { toastSuccess, toastError } from "../../Redux/Actions/alertStyle";
import { Container } from "@mui/system";
import DatePicker from "./registerComponents/DatePicker";
import Select from "./registerComponents/Select";
import PhoneNumberInput from "./registerComponents/CustomPhoneNumber";
import CustomStepper from "./registerComponents/Stepper";

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
    form: {
      height: "400px",
      overflow: "auto",
      width: "350px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      marginTop: "10px",
      field: {
        margin: "10px",
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

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "10px",
  boxShadow: theme.shadows[3],
}));

export default function Register({handleClose}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const clickHandler = (event) => {
    const { name } = event.target;
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
    if (user.rol === "Companion1" || user.rol === "Companion2") {
      dispatch(putCompanion(user.id, values)); //trae el id del user y lo actualiza
    } else {
      dispatch(putSupervisor(user.id, values));
    }
    toast.success("Datos actualizados", toastSuccess);
    handleClose()
  };
  const validationSchema = Yup.object().shape({
    profilePhoto: Yup.string().url("URL de la imágen inválida"),
    name: Yup.string()
      .max(15, "Debe ser menor a 15 caracteres")
      .required("Este campo es obligatorio"),
    lastName: Yup.string()
      .max(20, "Debe ser menor a 20 caracteres")
      .required("Este campo es obligatorio"),
    birthdayDate: Yup.date("").required("Este campo es obligatorio"),
    nationality: Yup.string().required("Este campo es obligatorio"),
    country: Yup.string().required("Este campo es obligatorio"),
    cityTimeZone: Yup.string().required("Este campo es obligatorio"),
    phone: Yup.string()
      .matches(
        /^\+?[0-9\s]*[1-9][0-9]*$/,
        "El número de teléfono debe contener solo números y espacios en blanco"
      )
      .test(
        "is-positive",
        "El número de teléfono debe ser positivo",
        (value) => !value || parseInt(value.replace(/\s+/g, "")) > 0
      )
      .required("Este campo es obligatorio"),
    studies: Yup.string().required("Este campo es obligatorio"),
    gender: Yup.string().required("Este campo es obligatorio"),
    profession: Yup.string().required("Este campo es obligatorio"),
  });

  return (
    <Container sx={styles.container}>
       
      <Formik
        initialValues={{
          profilePhoto: user.profilePhoto,
          name: user.name,
          lastName: user.lastName,
          birthdayDate: user.birthdayDate,
          nationality: user.nationality,
          country: user.country,
          cityTimeZone: user.CityTimeZone?.id,
          phone: user.phone,
          profession: user.profession,
          studies: user.studies,
          gender: user.gender,
          rol: user.rol,
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => {
          return (
            <>
              <StyledPaper>
                <Typography
                  variant="h5"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: "20px",
                  }}
                >
                  Editar Perfil
                </Typography>
                <CustomStepper index={index} sx={{ marginTop: "20px" }} />
                <Form sx={styles.form}>
                  {index === 0 ? (
                    <>
                      <Box>
                        <Field
                          sx={styles.container.form.field}
                          name="profilePhoto"
                        >
                          {({ field, form }) => (
                            <Box
                              sx={{
                                width: "300px",
                                marginBottom: "20px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <Button variant="contained" component="label">
                                {" "}
                                <UploadIcon sx={{ marginRight: "10px" }} />{" "}
                                Cambiar foto de perfil
                                <input
                                  type="file"
                                  hidden
                                  id={field.name}
                                  name={field.name}
                                  onChange={async (event) => {
                                    setLoading(true);
                                    const file = event.target.files[0];
                                    setFileName(file.name);
                                    const formData = new FormData();
                                    formData.append("file", file);
                                    formData.append(
                                      "upload_preset",
                                      "x75zrl2a"
                                    );
                                    const response = await axios.post(
                                      "https://api.cloudinary.com/v1_1/dws4qq5ak/image/upload",
                                      formData
                                    );
                                    form.setFieldValue(
                                      field.name,
                                      response.data.url
                                    );
                                    setLoading(false);
                                  }}
                                />
                              </Button>
                              <Box
                                sx={{
                                  display:
                                    field.value && fileName ? "flex" : "none",
                                  marginTop: "10px",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                  }}
                                >
                                  <Typography>Archivo seleccionado:</Typography>
                                  <Typography>{fileName}</Typography>
                                </Box>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    form.setFieldValue(field.name, "");
                                  }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                              {loading ? (
                                <LinearProgress sx={{ marginTop: "5px" }} />
                              ) : null}
                            </Box>
                          )}
                        </Field>
                      </Box>
                      <Box>
                        <Field
                          as={TextField}
                          name="name"
                          label="Nombre"
                          sx={styles.container.form.field}
                          helperText={<ErrorMessage name="name" />}
                          error={!!(props.errors.name && props.touched.name)}
                        />
                      </Box>
                      <Box>
                        <Field
                          as={TextField}
                          name="lastName"
                          label="Apellido"
                          sx={styles.container.form.field}
                          helperText={<ErrorMessage name="lastName" />}
                          error={
                            !!(props.errors.lastName && props.touched.lastName)
                          }
                        />
                      </Box>
                      <Box
                        onBlur={() =>
                          props.setFieldTouched("birthdayDate", true)
                        }
                      >
                        <Field
                          component={DatePicker}
                          name="birthdayDate"
                          label="Fecha de Nacimiento"
                          sx={styles.container.form.field}
                          helperText={<ErrorMessage name="birthdayDate" />}
                          error={
                            !!(
                              props.errors.birthdayDate &&
                              props.touched.birthdayDate
                            )
                          }
                        />
                      </Box>
                      <Box
                        sx={{
                          ...styles.container.form.buttonContainer,
                          flexDirection: "row-reverse",
                        }}
                      >

                        <Button
                          variant="contained"
                          name="Siguiente"
                          onClick={clickHandler}
                        >
                          Continuar
                        </Button>
                        {index === 0 ? 
                        <Button
                          variant="contained"
                          name="Siguiente"
                          onClick={handleClose}
                        >
                          Cancelar
                        </Button>
                        : null }
                      </Box>
                    </>
                  ) : null}
                  {index === 1 ? (
                    <>
                      <Box
                        onBlur={() =>
                          props.setFieldTouched("nationality", true)
                        }
                      >
                        <Field
                          component={CountrySelect}
                          name="nationality"
                          sx={styles.container.form.field}
                        ></Field>
                      </Box>
                      <Box
                        onBlur={() => props.setFieldTouched("country", true)}
                      >
                        <Field
                          component={CountrySelect}
                          name="country"
                          sx={styles.container.form.field}
                        >
                          {" "}
                          helperText={<ErrorMessage name="country" />}
                        </Field>
                      </Box>
                      <Box
                        onBlur={() =>
                          props.setFieldTouched("cityTimeZone", true)
                        }
                      >
                        <Field
                          sx={styles.container.form.field}
                          component={TimezoneSelect}
                          name="cityTimeZone"
                          helperText={<ErrorMessage name="cityTimeZone" />}
                        ></Field>
                      </Box>
                      <Box sx={styles.container.form.buttonContainer}>
                        <Button
                          variant="contained"
                          name="Anterior"
                          onClick={clickHandler}
                        >
                          Volver
                        </Button>
                        <Button
                          variant="contained"
                          name="Siguiente"
                          onClick={clickHandler}
                        >
                          Continuar
                        </Button>
                      </Box>
                    </>
                  ) : null}
                  {index === 2 ? (
                    <Box
                      sx={{
                        ...styles.container.form,
                        overflow: "auto",
                        padding: 0,
                        paddingTop: "20px",
                      }}
                    >
                      <Box>
                        <PhoneNumberInput
                          name="phone"
                          label="Número de teléfono"
                          sx={{ width: "300px", marginBottom: "20px" }}
                        />
                      </Box>
                      <Box>
                        <Select
                          name="studies"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="Nivel de estudios alcanzados"
                          options={[
                            "Secundario",
                            "Terciario",
                            "Universitario",
                            "Postgrado",
                          ]}
                        ></Select>
                      </Box>
                      <Box>
                        <Select
                          name="profession"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="¿Trabajas en alguna de estas áreas?"
                          options={[
                            "No",
                            "Psicólogo",
                            "Psiquiatra",
                            "Counselor",
                            "Coach",
                            "Asistente Social",
                            "Acompañante Espiritual",
                          ]}
                        />
                      </Box>
                      <Box>
                        <Select
                          name="gender"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="¿Con qué genero te identificas?"
                          options={[
                            "Mujer",
                            "Mujer-trans",
                            "Hombre",
                            "Hombre-trans",
                            "No-binario",
                            "Otra identidad",
                            "Prefiero no responder",
                          ]}
                        ></Select>
                      </Box>
                      <Box sx={styles.container.form.buttonContainer}>
                        <Button
                          variant="contained"
                          name="Anterior"
                          onClick={clickHandler}
                        >
                          Volver
                        </Button>
                        <Box
                          title={
                            !(
                              Object.keys(props.errors).length === 0 &&
                              Object.keys(props.touched).length > 0
                            )
                              ? "Por favor corrige los errores en los campos"
                              : null
                          }
                        >
                          <Button
                            onClick={() => {
                              !!props.errors.length ||
                              props.touched.length === 0
                                ? toast.error(
                                    "Por favor corrige los errores en los campos",
                                    toastError
                                  )
                                : null;
                            }}
                            variant="contained"
                            type="submit"
                            color="success"
                            sx={{ width: "113.86px" }}
                          >
                            Finalizar
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                </Form>
              </StyledPaper>
            </>
          );
        }}
      </Formik>
    </Container>
  );
}
