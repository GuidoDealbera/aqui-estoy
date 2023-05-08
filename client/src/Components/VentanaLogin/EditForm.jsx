import {
  Select,
  MenuItem,
  InputLabel,
  Button,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import { Container } from "@mui/system";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import {
  putCompanion,
  putSupervisor,
} from "../../Redux/Actions/postPutActions";

export default function EditForm(props) {
  const dispatch = useDispatch();
  const { allCompanions, allSupervisors } = useSelector((state) => state.view);
  const [user, setUser] = useState({});
  useEffect(() => {
    let allUsers = [...allCompanions, ...allSupervisors];
    setUser(allUsers.find((user) => user.id === props.userID));
  }, [allCompanions, allSupervisors]);
  const submitHandler = (values) => {
    console.log(values);
    if (user.rol === "Companion1" || user.rol === "Companion2") {
      dispatch(putCompanion(user.id, values));
    } else if (user.rol === "Supervisor" || user.rol === "SuperAdmin") {
      dispatch(putSupervisor(user.id, values));
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
          Nombre
        </InputLabel>
        <Field as={TextField} name="name" sx={{width: 300}} />
        <ErrorMessage name="name">
          {(msg) => <Typography color="error">{msg}</Typography>}
        </ErrorMessage>
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
          name: user.name,
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
