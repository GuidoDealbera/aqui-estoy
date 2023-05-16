import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordRecoveryCode } from "../../Redux/Actions/viewActions";
import { toast } from "sonner";
import { putUserPassword } from "../../Redux/Actions/postPutActions";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { useNavigate } from "react-router-dom";
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "10px",
  boxShadow: theme.shadows[3],
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("Requerido"),
});

const PasswordRecovery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const { passwordRecoveryInfo } = useSelector((status) => status.auth);
  const [recoveryCode, setRecoveryCode] = useState("");

  const submitHandler = async (values) => {
    if (step === 0) {
      const { email } = values;
      setEmail(email);
      dispatch(getPasswordRecoveryCode(email));
      setStep(1);
    } else if (step === 1) {
      const { recoveryCode } = values;
      setRecoveryCode(recoveryCode);
      if (passwordRecoveryInfo.code === recoveryCode) {
        setStep(2);
      }
    } else if (step === 2) {
      const { password, confirmPassword } = values;
      console.log(password, confirmPassword);
      dispatch(putUserPassword(passwordRecoveryInfo, password));
      toast.success("Tu contraseña ha sido cambiada con exito", toastSuccess);
      navigate("/");
    }
  };
  const recoveryCodeValidationSchema = Yup.object().shape({
    recoveryCode: Yup.string()
      .length(
        6,
        "El código de recuperación debe tener exactamente 6 caracteres"
      )
      .required("Requerido"),
  });

  const newPasswordValidationSchema = Yup.object().shape({
    recoveryCode: Yup.string()
      .length(
        6,
        "El código de recuperación debe tener exactamente 6 caracteres"
      )
      .required("Requerido"),
    password: Yup.string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .required("Requerido"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Requerido"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        recoveryCode: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={
        step === 0
          ? validationSchema
          : step === 1
          ? recoveryCodeValidationSchema
          : newPasswordValidationSchema
      }
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <Container maxWidth="sm">
            <StyledPaper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {step === 0
                      ? "Recuperar contraseña"
                      : step === 1
                      ? "Introduce el código de recuperación"
                      : "Restaurar contraseña"}
                  </Typography>
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
                        error={!!ErrorMessage.name}
                        helperText={<ErrorMessage name="email" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                        <StyledButton
                          variant="contained"
                          type="submit"
                          onClick={() => {
                            navigate(-1);
                          }}
                          sx={{ margin: "1vw" }}
                        >
                          Cancelar
                        </StyledButton>
                        <StyledButton
                          variant="contained"
                          type="submit"
                          disabled={isSubmitting}
                          sx={{ margin: "1vw" }}
                        >
                          Enviar correo
                        </StyledButton>
                      </Box>
                    </Grid>
                  </>
                ) : step === 1 ? (
                  <>
                    <Grid item xs={12}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="recoveryCode"
                        label="Código de recuperación"
                        name="recoveryCode"
                        error={!!ErrorMessage.name}
                        helperText={<ErrorMessage name="recoveryCode" />}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box display="flex" justifyContent="center">
                      <StyledButton
                          variant="contained"
                          type="submit"
                          onClick={() => {
                            navigate(-1);
                          }}
                          sx={{ margin: "1vw" }}
                        >
                          Cancelar
                        </StyledButton>
                        <StyledButton
                          variant="contained"
                          type="submit"
                          sx={{ margin: "1vw" }}
                          disabled={isSubmitting}
                        >
                          Verificar código
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
                        id="password"
                        label="Nueva contraseña"
                        name="password"
                        type="password"
                        error={!!ErrorMessage.name}
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
                        error={!!ErrorMessage.name}
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
};

export default PasswordRecovery;
