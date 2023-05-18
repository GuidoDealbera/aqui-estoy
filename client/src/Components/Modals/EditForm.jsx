import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { styled } from "@mui/system";
import {
  InputLabel,
  Button,
  Typography,
  TextField,
  Box,
  Paper,
  MenuItem,
  Select,
} from "@mui/material";
import {
  postSupervisorCharge,
  putCompanionEdit,
  putSupervisorEdit,
} from "../../Redux/Actions/postPutActions";
import {
  getAllCompanions,
  getAllSupervisors,
} from "../../Redux/Actions/viewActions";
import { useDispatch, useSelector } from "react-redux";
import CountrySelect from "../../Views/Register/registerComponents/CountrySelect";
import TimezoneSelect from "../../Views/Register/registerComponents/TimeZoneSelect";
import { toast } from "sonner";
import { toastError, toastSuccess } from "../../Redux/Actions/alertStyle";
import { Container } from "@mui/system";
import DatePicker from "../../Views/Register/registerComponents/DatePicker";
import CustomSelect from "../../Views/Register/registerComponents/Select";
import PhoneNumberInput from "../../Views/Register/registerComponents/CustomPhoneNumber";
import CustomStepper from "../../Views/Register/registerComponents/Stepper";
import Loader from "../Loader/Loader";

const styles = {
  container: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "50px",
    form: {
      // height: "450px",
      height: "70vh",
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


//------------------COMPONENT------------------------
export default function EditForm({ userID, handleClose }) {
  const dispatch = useDispatch();
  const { allCompanions, allSupervisors } = useSelector((state) => state.view);
  const adminUser = useSelector((state) => state.auth.user);
  const [user, setUser] = useState({});
  const [index, setIndex] = useState(0);
  const [supervisorSelected, setSupervisorSelected] = useState("");
  const asignSupervisor = () => {
    if (
      (user.rol === "Companion1" || user.rol === "Companion2") &&
      supervisorSelected.length > 0
    ) {
      dispatch(postSupervisorCharge(supervisorSelected, [userID]));
    }
  };

  useEffect(() => {
    let allUsers = [...allCompanions, ...allSupervisors];
    setUser(allUsers.find((user) => user.id === userID));
  }, [allCompanions, allSupervisors]);
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
  const submitHandler = async (values) => {
    const { rol, name, isActive } = values;
    if (user.rol === rol) {
      if (rol === "Companion1" || rol === "Companion2") {
        dispatch(putCompanionEdit(user.id, values));
      } else {
        dispatch(putSupervisorEdit(user.id, values));
      }
    } else if (
      (user.rol === "Companion1" && rol === "Companion2") ||
      (user.rol === "Companion2" && rol === "Companion1")
    ) {
      dispatch(putCompanionEdit(user.id, values));
    } else if (
      (user.rol === "Supervisor" && rol === "SuperAdmin") ||
      (user.rol === "SuperAdmin" && rol === "Supervisor")
    ) {
      dispatch(putSupervisorEdit(user.id, values));
    } else if (
      (user.rol === "Companion1" || user.rol === "Companion2") &&
      (rol === "Supervisor" || rol === "SuperAdmin")
    ) {
      await axios.post(`/postRankUpCompanion`, {
        email: adminUser.email,
        password: adminUser.password,
        id: user.id,
        rol: rol,
      });
      dispatch(getAllCompanions());
      dispatch(getAllSupervisors());
    } else if (
      (user.rol === "Supervisor" || user.rol === "SuperAdmin") &&
      (rol === "Companion1" || rol === "Companion2")
    ) {
      await axios.post(`/postDowngradeSupervisor`, {
        email: adminUser.email,
        password: adminUser.password,
        id: user.id,
        rol: rol,
      });
      dispatch(getAllCompanions());
      dispatch(getAllSupervisors());
    }
    asignSupervisor();
    toast.success("Datos actualizados exitosamente", toastSuccess);
    handleClose();
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    lastName: Yup.string(),
    birthdayDate: Yup.string(),
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
      )
      ,
    rol: Yup.string(),
    isActive: Yup.boolean(),
    referent: Yup.string(),
    studies: Yup.string(),
    gender: Yup.string(),
    profession: Yup.string(),
  });

  return Object.entries(user).length > 0 ? (
    <Container sx={styles.container}>
      <Formik
        initialValues={{
          name: user.name ? user.name : "",
          lastName: user.lastName ? user.lastName : "",
          birthdayDate: user.birthdayDate ? user.birthdayDate : "",
          nationality: user.nationality ? user.nationality : "",
          country: user.country ? user.country : "",
          cityTimeZone: user.CityTimeZone?.id ? user.CityTimeZone.id : "",
          phone: user.phone ? user.phone : "",
          profession: user.profession ? user.profession : "",
          studies: user.studies ? user.studies : "",
          gender: user.gender ? user.gender : "",
          rol: user.rol,
          isActive: user.isActive,
          referent: user.Supervisor ? user.Supervisor?.id : "No asignado",
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
                  Editar usuario
                </Typography>
                <CustomStepper index={index} sx={{ marginTop: "20px" }} />
                <Form sx={styles.form}>
                  {index === 0 ? (
                    <>
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
                          Estado de la cuenta
                        </InputLabel>
                        <Field
                          as={Select}
                          sx={styles.container.form.field}
                          name="isActive"
                        >
                          <MenuItem disabled value="">
                            Seleccione el estado de la cuenta
                          </MenuItem>
                          <MenuItem value={true}>Activa</MenuItem>
                          <MenuItem value={false}>Inactiva</MenuItem>
                        </Field>
                        <ErrorMessage name="isActive">
                          {(msg) => (
                            <Typography color="error">{msg}</Typography>
                          )}
                        </ErrorMessage>
                      </Box>
                      <Box>
                        <Field
                          as={Select}
                          sx={styles.container.form.field}
                          name="rol"
                        >
                          <MenuItem disabled value="">
                            Seleccione un rol
                          </MenuItem>
                          <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
                          <MenuItem value="Supervisor">Supervisor</MenuItem>
                          <MenuItem value="Companion1">Acompañante Inicial</MenuItem>
                          <MenuItem value="Companion2">Acompañante Avanzado</MenuItem>
                        </Field>
                        <ErrorMessage name="rol">
                          {(msg) => (
                            <Typography color="error">{msg}</Typography>
                          )}
                        </ErrorMessage>
                      </Box>
                      {user.rol !== "Supervisor" &&
                        user.rol !== "SuperAdmin" && (
                          <Box>
                            <Field
                              as={Select}
                              sx={styles.container.form.field}
                              name="referent"
                            >
                              <MenuItem
                                value="No asignado"
                                sx={{ display: "none" }}
                              >
                                No asignado
                              </MenuItem>
                              <MenuItem disabled value="">
                                Seleccione un supervisor
                              </MenuItem>
                              {allSupervisors?.map((supervisor) => {
                                if (supervisor.name)
                                  return (
                                    <MenuItem
                                      key={supervisor?.id}
                                      value={supervisor?.id}
                                      onClick={() =>
                                        setSupervisorSelected(supervisor.id)
                                      }
                                    >{`${supervisor?.name} ${supervisor.lastName}`}</MenuItem>
                                  );
                              })}
                            </Field>
                            <ErrorMessage name="referent">
                              {(msg) => (
                                <Typography color="error">{msg}</Typography>
                              )}
                            </ErrorMessage>
                          </Box>
                        )}
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
                        <Button
                          variant="contained"
                          name="Cancelar"
                          onClick={handleClose}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </>
                  ) : null}
                  {index === 1 ? (
                    <>
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
                        <CustomSelect
                          name="studies"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="Nivel de estudios alcanzados"
                          options={[
                            "",
                            "Secundario",
                            "Terciario",
                            "Universitario",
                            "Postgrado",
                          ]}
                        />
                      </Box>
                      <Box>
                        <CustomSelect
                          name="profession"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="¿Trabajas en alguna de estas áreas?"
                          options={[
                            "",
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
                        <CustomSelect
                          name="gender"
                          sx={{ marginBottom: "20px", width: "300px" }}
                          label="¿Con qué genero te identificas?"
                          options={[
                            "",
                            "Mujer",
                            "Mujer-trans",
                            "Hombre",
                            "Hombre-trans",
                            "No-binario",
                            "Otra identidad",
                            "Prefiero no responder",
                          ]}
                        ></CustomSelect>
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
                            variant="contained"
                            type="submit"
                            color="success"
                            sx={{ width: "113.86px" }}
                            onClick={() => {
                              (Object.keys(props.errors).length !== 0) && toast.error("Hay campos vacíos, por favor revíselos", toastError)
                            }}
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
  ) : (
    <Loader />
  );
}
