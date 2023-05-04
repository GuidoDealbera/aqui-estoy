import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { getOneCompanion, getOneSupervisor } from '../../Redux/Actions/viewActions';
import { useNavigate } from "react-router-dom"
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledLoginButton = styled(Button)(({ theme }) => ({

}));

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Requerido'),
  password: Yup.string().min(6, 'Debe tener al menos 6 caracteres').required('Requerido'),
});

const LoginForm = ({ handleMouseLeave }) => {
  
  const [rol, setRol] = useState("Acompañante")

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setRol(newRole);
    }
  }

  const navigate = useNavigate()

  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const {name, id} = user
  useEffect(() => {
    if(Object.entries(user).length){
      if (name) {
        navigate(`/profile/${id}`)
      } else {
        navigate("/register")
      }
      handleMouseLeave()
    } 
  }, [user])
  const submitHandler = async (values) => {
    
    const { email, password } = values;
    
    if (rol === "Supervisor") {
      dispatch(getOneSupervisor(email, password)) //Register
    } else { // Companion
      dispatch(getOneCompanion(email, password))
    }
  }

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
                <ToggleButtonGroup
                  value={rol}
                  exclusive
                  onChange={handleRoleChange}
                  aria-label="rol"
                >
                  <ToggleButton value="Acompañante" aria-label="Acompañante">
                    Acompañante
                  </ToggleButton>
                  <ToggleButton value="Supervisor" aria-label="Supervisor">
                    Supervisor
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
              <Grid item xs={12}>
  <Field
    as={TextField}
    fullWidth
    id="email"
    label="Correo electrónico"
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
                  <StyledLoginButton
                    variant="contained"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Iniciar sesión
                  </StyledLoginButton>
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
