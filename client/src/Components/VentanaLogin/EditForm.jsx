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
import { Container } from "@mui/system";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Loader/Loader'

export default function EditForm(props) {
    const {allCompanions, allSupervisors} = useSelector(state => state.view)
    const [user, setUser] = useState({})
    useEffect(() => {
        let allUsers = [...allCompanions, ...allSupervisors];
        setUser(
            allUsers.find(user => user.id === props.userID)
        )
    }, [allCompanions, allSupervisors])
  const dispatch = useDispatch();
  const submitHandler = () => {
    console.log(user);
  };

  const validationSchema = Yup.object().shape({
    isActive: Yup.string(),
    rol: Yup.string(),
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
          <MenuItem value="Si">Si</MenuItem>
          <MenuItem value="No">No</MenuItem>
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
  return (
    Object.entries(user).length > 0 ?
    <Container /*sx={styles.container}*/>
      <Typography variant="h5">Editar Usuario</Typography>
      <Formik
        initialValues={{
          //Valores iniciales de Formik, la equivalencia Vanilla sería ir almacenando los datos en el estado local...
          isActive: user.isActive ? "Si" : "No",
          rol: user.rol,
          //profilePhoto: "",
          //name: "",
          //lastName: "",
          //birthdayDate: "",
          //nationality: "",
          //   country: viewUser.country,
          //   cityTimeZone: viewUser.cityTimeZone,
          //   phone: viewUser.phone,
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
    </Container> : <Loader/>
  );
}