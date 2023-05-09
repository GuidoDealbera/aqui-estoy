import { Select, MenuItem, InputLabel, Button, Typography, TextField, Box } from "@mui/material";
import { Container } from "@mui/system";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { putCompanionEdit, putSupervisorEdit } from "../../Redux/Actions/postPutActions";
import axios from "axios";
import { getAllSupervisors, getAllCompanions } from "../../Redux/Actions/viewActions";

export default function EditForm(props) {
  const dispatch = useDispatch();
  const { allCompanions, allSupervisors } = useSelector((state) => state.view);
  const adminUser = useSelector((state) => state.auth.user)
  const [user, setUser] = useState({});
  useEffect(() => {
    let allUsers = [...allCompanions, ...allSupervisors];
    setUser(allUsers.find((user) => user.id === props.userID));
  }, [allCompanions, allSupervisors]);

  const submitHandler = async (values) => {
    const { rol, name, isActive } = values;
    if (user.rol === rol) { //Si el rol no cambia
      if (rol === "Companion1" || rol === "Companion2") { //Si es companion
        dispatch(putCompanionEdit(user.id, values))
      } else { //Si es supervisor
        dispatch(putSupervisorEdit(user.id, values))
      }
    } else if ((user.rol === "Companion1" && rol === "Companion2") || (user.rol === "Companion2" && rol === "Companion1")) { //S
      dispatch(putCompanionEdit(user.id, values))
    } else if ((user.rol === "Supervisor" && rol === "SuperAdmin") || (user.rol === "SuperAdmin" && rol === "Supervisor")) {
      dispatch(putSupervisorEdit(user.id, values))
    } else if ((user.rol === "Companion1" || user.rol === "Companion2") && (rol === "Supervisor" || rol === "SuperAdmin")) {
      dispatch(putCompanionEdit(user.id, { name, isActive }))
      await axios.post(`/postRankUpCompanion`, {
        email: adminUser.email,
        password: adminUser.password,
        id: user.id,
        rol: rol
      })
      dispatch(getAllCompanions())
      dispatch(getAllSupervisors())
    } else if ((user.rol === "Supervisor" || user.rol === "SuperAdmin") && (rol === "Companion1" || rol === "Companion2")) {
      dispatch(putSupervisorEdit(user.id, { name, isActive }))
      await axios.post(`/postDowngradeSupervisor`, {
        email: adminUser.email,
        password: adminUser.password,
        id: user.id,
        rol: rol
      })
      dispatch(getAllCompanions())
      dispatch(getAllSupervisors())
    }
    toast.success("Datos actualizados exitosamente", toastSuccess);
  };

  const validationSchema = Yup.object().shape({
    isActive: Yup.boolean(),
    rol: Yup.string(),
    name: Yup.string().max(15, "Debe ser menor a 15 caracteres"),
  });

  const renderForm = (
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
        <Field as={Select} sx={{ width: 300 }} name="isActive">
          <MenuItem disabled>Seleccione el estado de la cuenta</MenuItem>
          <MenuItem value={true}>Activa</MenuItem>
          <MenuItem value={false}>Inactiva</MenuItem>
        </Field>
        <ErrorMessage name="isActive">
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
          Rol
        </InputLabel>
        <Field as={Select} sx={{ width: 300 }} name="rol">
          <MenuItem disabled>Seleccione un rol</MenuItem>
          <MenuItem value="SuperAdmin">SuperAdmin</MenuItem>
          <MenuItem value="Supervisor">Supervisor</MenuItem>
          <MenuItem value="Companion1">Acompañante 1</MenuItem>
          <MenuItem value="Companion2">Acompañante 2</MenuItem>
        </Field>
        <ErrorMessage name="rol">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
      </Box>
      <Box>
        <Button type="submit">Finalizar</Button>
      </Box>
    </>
  );
  return Object.entries(user).length > 0 ? (
    <Container>
      <Typography variant="h5">Editar Usuario</Typography>
      <Formik
        initialValues={{
          isActive: user.isActive,
          rol: user.rol,
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => {
          return (
            <Form>
              {renderForm}
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
  ) : (
    <Loader />
  );
}
