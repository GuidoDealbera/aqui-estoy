import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getBothRoles } from '../../Redux/Actions/viewActions';
import { useNavigate } from "react-router-dom"
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});

const LoginForm = ({ handleMouseLeave }) => {

  const [rol, setRol] = useState("Acompañante")
  const toggle = (event) => {
    if (event.target.value === "Acompañante") {
      setRol("Supervisor")
    } else {
      setRol("Acompañante")
    }
  }

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const submitHandler = async (values) => {

    // const { email, password } = values;
    // if (rol === "Supervisor") {
    //   dispatch(getBothRoles(email, password))
    //   try {
    //     const response = await axios.post("http://localhost:3001/getBothRoles", {
    //       email, password
    //     })
    //     const { data } = response;
    //     const { name } = data;
    //     console.log(name);
    //   } catch (error) {

    //   }
    // } else {
    //   dispatch(getBothRoles(email, password))
    //   const response = await axios.post("http://localhost:3001/getBothRoles", {
    //     email, password
    //   })
    //   const { data } = response;
    //   const { name } = data;
    //   console.log(name);
    // }

    // // if (typeof user !== "string") {
    // //   const { name } = user;
    // //   if (name) {
    // //     navigate("/profile/Chiringuito")
    // //   } else {
    // //     navigate("/register")
    // //   }
    // //   handleMouseLeave()
    // // }

  }

  const user = useSelector((state) => {
    return state.auth.user
  })

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container maxWidth="sm">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5">Iniciar sesión</Typography>
                <button value={rol} type='button' onClick={toggle} name="Acompañante">{rol}</button>
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  type="email"
                  error={!!(ErrorMessage.name)}
                  helperText={<ErrorMessage name="email" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  fullWidth
                  id="password"
                  label="Contraseña"
                  name="password"
                  type="password"
                  error={!!(ErrorMessage.name)}
                  helperText={<ErrorMessage name="password" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  // disabled={isSubmitting}
                  >
                    Iniciar Sesión
                  </Button>
                  <Button onClick={() => handleMouseLeave()}>Cancelar</Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
