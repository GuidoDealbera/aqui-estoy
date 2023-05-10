import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from "react-redux"
import { getPasswordRecoveryCode } from '../../Redux/Actions/viewActions';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '10px',
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Correo electrónico inválido').required('Requerido'),
});

const PasswordRecovery = () => {
  const dispatch=useDispatch()
  const submitHandler = async (values) => {
    const { email } = values;
   dispatch(getPasswordRecoveryCode(email))
  };

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container maxWidth="sm">
            <StyledPaper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">Recuperar contraseña</Typography>
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
                  <Box display="flex" justifyContent="center">
                    <StyledButton
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Enviar correo
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordRecovery;
