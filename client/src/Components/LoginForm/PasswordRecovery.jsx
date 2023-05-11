import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
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
import { useDispatch, useSelector } from "react-redux";
import { getPasswordRecoveryCode, updatePassword } from '../../Redux/Actions/viewActions';

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
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  const submitHandler = async (values) => {
    if (step === 0) {
      const { email } = values;
      setEmail(email);
      dispatch(getPasswordRecoveryCode(email));
      setStep(1);
    } else if (step === 1) {
      const { recoveryCode, password, confirmPassword } = values;
      dispatch(updatePassword(email, recoveryCode, password));
    }
  };

  const newPasswordValidationSchema = Yup.object().shape({
    recoveryCode: Yup.string()
      .length(6, 'El código de recuperación debe tener exactamente 6 caracteres')
      .required('Requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Requerido'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Requerido'),
  });

  return (
    <Formik
      initialValues={step === 0 ? { email: '' } : { recoveryCode: '', password: '', confirmPassword: '' }}
      validationSchema={step === 0 ? validationSchema : newPasswordValidationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container maxWidth="sm">
            <StyledPaper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">{step === 0 ? 'Recuperar contraseña' : 'Restaurar contraseña'}</Typography>
                </Grid>
                {step === 0 ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="recoveryCode"
                        label="Código de recuperación"
                        name="recoveryCode"
                        error={!!(ErrorMessage.name)}
                        helperText={<ErrorMessage name="recoveryCode" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="password"
                        label="Nueva contraseña"
                        name="password"
                        type="password"
                        error={!!(ErrorMessage.name)}
                        helperText={<ErrorMessage name="password" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="confirmPassword"
                        label="Confirmar nueva contraseña"
                        name="confirmPassword"
                        type="password"
                        error={!!(ErrorMessage.name)}
                        helperText={<ErrorMessage name="confirmPassword" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                        <StyledButton
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Restaurar contraseña
                        </StyledButton>
                      </Box>
                    </Grid>
                  </>
                )}
              </Grid>
            </StyledPaper>
          </Container>
        </Form>
      )}
    </Formik>
  );
                }

export default PasswordRecovery;
