import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import { styled } from '@mui/system';
import { InputLabel, Button, Typography, TextField, Box, Input, Paper, MenuItem } from '@mui/material';
import { putCompanion, putSupervisor } from '../../Redux/Actions/postPutActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CountrySelect from './registerComponents/CountrySelect';
import TimezoneSelect from "./registerComponents/TimeZoneSelect";
import { toast } from "sonner";
import { toastSuccess } from "../../Redux/Actions/alertStyle";
import { Container } from '@mui/system';
import DatePicker from './registerComponents/DatePicker';
import { Select } from './registerComponents/Select';

const styles = {
    container: {
        flexDirection: 'column',
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
        form: {
            height: "400px",
            width: "300px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            marginTop: "10px",
            field: {
                margin: "10px",
                width: "300px"
            },
            buttonContainer: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: "auto",
                button: {
                    margin: "10px"
                }
            }
        }
    }
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: '10px',
    boxShadow: theme.shadows[3],
}));

export default function Register() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate();

    const [index, setIndex] = useState(0) //Estado del "paginado" de los inputs (Mirar Figma).

    const clickHandler = (event) => { //Handler que modifica el estado de arriba.
        const { target } = event;
        const { name } = target;
        switch (name) {
            case "Siguiente":
                setIndex(index + 1)
                break;

            case "Anterior":
                setIndex(index - 1)
                break;

            default:
                break;
        }
    }

    const submitHandler = (values) => { //Submit Handler del formulario (Aún no interactúa con el Back-End)
        console.log(values);
        if (user.rol === 'Companion1' || user.rol === "Companion2") {
            dispatch(putCompanion(user.id, values)) //trae el id del user y lo actualiza 
        } else {
            dispatch(putSupervisor(user.id, values))
        }
        toast.success('Datos actualizados', toastSuccess);
        navigate(`/profile/${user.id}`);
    }

    const validationSchema = Yup.object().shape({ //Validaciones de Yup (Aún en desarrollo)
        profilePhoto: Yup.string()
            .url('URL de la imágen inválida'),
        name: Yup.string()
            .max(15, "Debe ser menor a 15 caracteres")
            .required('Este campo es obligatorio'),
        lastName: Yup.string()
            .max(20, "Debe ser menor a 20 caracteres")
            .required('Este campo es obligatorio'),
        birthdayDate: Yup.date()
            .required('Este campo es obligatorio'),
        nationality: Yup.string().required('Este campo es obligatorio'),
        country: Yup.string().required('Este campo es obligatorio'),
        cityTimeZone: Yup.string().required('Este campo es obligatorio'),
        phone: Yup.string()
            .matches(/^\+?[0-9\s]*[1-9][0-9]*$/, 'El número de teléfono debe contener solo números y espacios en blanco')
            .test('is-positive', 'El número de teléfono debe ser positivo', (value) => !value || parseInt(value.replace(/\s+/g, '')) > 0)
            .required('Este campo es obligatorio'),
        studies: Yup.string().required('Este campo es obligatorio'),
        gender: Yup.string().required('Este campo es obligatorio'),
        profession: Yup.string().required('Este campo es obligatorio'),
    });



    return (
        <Container sx={styles.container}>
            <Formik
                initialValues={{ //Valores iniciales de Formik, la equivalencia Vanilla sería ir almacenando los datos en el estado local...
                    profilePhoto: "",
                    name: "",
                    lastName: "",
                    birthdayDate: "",
                    nationality: "",
                    country: "",
                    cityTimeZone: "",
                    phone: "",
                    profession: "",
                    studies: "",
                    gender: "",
                    rol: user.rol
                }}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
            >
                {(props) => {
                    return (<>
                        <StyledPaper>
                            <Typography variant="h5" sx={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "20px" }}>Formulario de Registro</Typography>
                            <Form sx={styles.form}>

                                {index === 0 ? <>
                                    <Box sx={{ marginLeft: "20px" }}>
                                        <InputLabel>Foto de Perfil</InputLabel>
                                        <Field sx={styles.container.form.field} name="profilePhoto">
                                            {({ field, form }) => (
                                                <>
                                                    <Input
                                                        sx={{ width: "300px" }}
                                                        disableUnderline
                                                        id={field.name}
                                                        name={field.name}
                                                        type="file"
                                                        onChange={async (event) => {
                                                            const file = event.target.files[0];
                                                            const formData = new FormData();
                                                            formData.append("file", file)
                                                            formData.append("upload_preset", "mzntwjvh")

                                                            const response = await axios.post("https://api.cloudinary.com/v1_1/dqvz1juaf/image/upload", formData)
                                                            form.setFieldValue(field.name, response.data.url);
                                                        }}
                                                    />
                                                </>
                                            )}
                                        </Field>
                                    </Box>
                                    <Box>
                                        <Field as={TextField} name="name" label="Nombre" sx={styles.container.form.field} helperText={<ErrorMessage name="name" />} error={!!(props.errors.name && props.touched.name)} />
                                    </Box>
                                    <Box>
                                        <Field as={TextField} name="lastName" label="Apellido" sx={styles.container.form.field} helperText={<ErrorMessage name="lastName" />} error={!!(props.errors.lastName && props.touched.lastName)} />
                                    </Box>
                                    <Box onBlur={() => props.setFieldTouched("birthdayDate", true)}>
                                        <Field component={DatePicker} name="birthdayDate" label="Fecha de Nacimiento" sx={styles.container.form.field} helperText={<ErrorMessage name="birthdayDate" />} error={!!(props.errors.birthdayDate && props.touched.birthdayDate)} />
                                    </Box>
                                    <Box sx={{ ...styles.container.form.buttonContainer, flexDirection: "row-reverse" }}>
                                        <Button variant="contained" name="Siguiente" onClick={clickHandler}>Continuar</Button>
                                    </Box>
                                </> : null}
                                {index === 1 ? <>
                                    <Box onBlur={() => props.setFieldTouched("nationality", true)}>
                                        <Field
                                            component={CountrySelect}
                                            name="nationality"
                                            sx={styles.container.form.field}
                                        >
                                        </Field>
                                    </Box>
                                    <Box onBlur={() => props.setFieldTouched("country", true)}>
                                        <Field component={CountrySelect} name="country" sx={styles.container.form.field}> helperText={<ErrorMessage name="country" />}</Field>
                                    </Box>
                                    <Box onBlur={() => props.setFieldTouched("cityTimeZone", true)}>
                                        <Field
                                            sx={styles.container.form.field}
                                            component={TimezoneSelect}
                                            name="cityTimeZone"
                                            helperText={<ErrorMessage name="cityTimeZone" />}
                                        >
                                        </Field>
                                    </Box>
                                    <Box sx={styles.container.form.buttonContainer}>
                                        <Button variant="contained" name="Anterior" onClick={clickHandler}>Volver</Button>
                                        <Button variant="contained" name="Siguiente" onClick={clickHandler}>Continuar</Button>
                                    </Box>
                                </> : null}
                                {index === 2 ? <>
                                    <Box>
                                        <Field name='phone' as={TextField} sx={styles.container.form.field} label="Teléfono" helperText={<ErrorMessage name="phone" />} error={!!(props.errors.phone && props.touched.phone)} />
                                    </Box>
                                    <Box>
                                        <InputLabel sx={{
                                            fontSize: '13px',
                                            maxWidth: '300px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'visible',
                                            textOverflow: 'ellipsis',
                                        }}>¿Estudias o trabajas en alguna de estas areas?</InputLabel>
                                        <Select name='profession' sx={{ marginBottom: "20px" }}
                                            options={[<MenuItem value="Psicólogo">Psicólogo</MenuItem>,
                                            <MenuItem value="Psiquiatra">Psiquiatra</MenuItem>,
                                            <MenuItem value="Counselor">Counselor</MenuItem>,
                                            <MenuItem value="Coach">Coach</MenuItem>,
                                            <MenuItem value="Asistente Social">Asistente Social</MenuItem>,
                                            <MenuItem value="Acompañante Espiritual">Acompañante Espiritual</MenuItem>,
                                            <MenuItem value="Estudiante">Estudiante</MenuItem>,
                                            <MenuItem value="No">No</MenuItem>]} />
                                    </Box>
                                    <Box onBlur={() => props.setFieldTouched("studies", true)}>
                                        <Select sx={styles.container.form.field} name="studies" >
                                        </Select>
                                    </Box>
                                    <Box onBlur={() => props.setFieldTouched("gender", true)}>
                                        <Select sx={styles.container.form.field} name="gender">
                                        </Select>
                                        <ErrorMessage name='gender'>
                                            {msg => <Typography color="error">{msg}</Typography>}
                                        </ErrorMessage>
                                    </Box>
                                    <Box sx={styles.container.form.buttonContainer}>
                                        <Button variant="contained" name="Anterior" onClick={clickHandler}>Volver</Button>
                                        <Button variant="contained" type='submit' color="success" sx={{ width: "113.86px" }}>Finalizar</Button>
                                    </Box>
                                </> : null}

                            </Form>
                        </StyledPaper>
                        {props.errors && Object.keys(props.errors).length > 0 &&
                            <Typography sx={{ margin: "20px", color: "red" }}>Hay errores en los campos. Por favor, revíselos.</Typography>
                        }
                    </>)
                }}
            </Formik>
        </Container>
    )
}