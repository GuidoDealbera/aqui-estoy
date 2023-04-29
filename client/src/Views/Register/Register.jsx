import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import allCountries from './data';
import { Select, MenuItem, InputLabel, Button, Typography, TextField, Box, Input } from '@mui/material';
import { putCompanion, putSupervisor } from '../../Redux/Actions/postPutActions';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const [timezones, setTimezones] = useState([]);
    const dispatch = useDispatch();
    const {user} = useSelector(state=> state.auth)
    const navigate = useNavigate();   
  
    useEffect(() => {
        axios("http://localhost:3001/getCityTimeZone").then(
            (response) => {
                const { data } = response;
                const result = data.map((timezone) => {
                    return `${timezone.offSet} ${timezone.zoneName}`
                })
                setTimezones(result)
            }
        )
    }, [])

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
  
     if(user.rol === 'Companion' || user.rol === "Acompañante2"){
        dispatch(putCompanion(user.id, values)) //trae el id del user y lo actualiza 
     } else{
        dispatch(putSupervisor(user.id, values))
     }
      alert('Datos actualizados');
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
        nationality: Yup.string(),
        country: Yup.string(),
        cityTimeZone: Yup.string(),
        email: Yup.string()
            .email('El e-mail proporcionado no es válido')
            .required('Este campo es obligatorio'),
        phone: Yup.string()
            .matches(/^\+?[0-9\s]*[1-9][0-9]*$/, 'El número de teléfono debe contener solo números y espacios en blanco')
            .test('is-positive', 'El número de teléfono debe ser positivo', (value) => !value || parseInt(value.replace(/\s+/g, '')) > 0),
        studies: Yup.string(),
        gender: Yup.string(),
    });

    //Estas 3 páginas es simplemente código html dividido en 3 partes, para hacer el paginado de "Siguiente", "Anterior" (Mirar Figma)

    const firstPage = <>
        <Box>
            <InputLabel>Foto de Perfil</InputLabel>
            <Field name="profilePhoto">
                {({ field, form }) => (
                    <>
                        <Input
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
            <ErrorMessage name='profilePhoto'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Nombre</InputLabel>
            <Field as={TextField} name="name" />
            <ErrorMessage name='name'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Apellido</InputLabel>
            <Field as={TextField} name="lastName" />
            <ErrorMessage name='lastName'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Fecha de Nacimiento</InputLabel>
            <Field as={TextField} name="birthdayDate" type="date" />
            <ErrorMessage name='birthdayDate'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Button name="Siguiente" onClick={clickHandler}>Continuar</Button>
    </>

    const secondPage = <>
        <Box>
            <InputLabel>Nacionalidad</InputLabel>
            <Field
                as={Select}
                name="country"
            >
                <MenuItem value="" disabled>Select an option</MenuItem>
                {allCountries.map((country, i) => (
                    <MenuItem key={i} value={country}>
                        {country}
                    </MenuItem>
                ))}
            </Field>
            <ErrorMessage name='nationality'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Pais de residencia actual</InputLabel>
            <Field as={Select} name="residence">
                <MenuItem value="" disabled>Select an option</MenuItem>
                {allCountries.map((country, i) => {
                    return <MenuItem key={i} value={country}>{country}</MenuItem>
                })}
            </Field>
            <ErrorMessage name='country'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Ciudad / huso horario de residencia</InputLabel>
            <Field as={Select} name="cityTimeZone">
                <MenuItem value="" disabled>Select an option</MenuItem>
                {timezones.map((timezone, i) => {
                    return <MenuItem value={timezone} key={i}>{timezone}</MenuItem>
                })}
            </Field>
            <ErrorMessage name='cityTimeZone'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>E-mail</InputLabel>
            <Field as={TextField} name='email' />
            <ErrorMessage name='email'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Button name="Anterior" onClick={clickHandler}>Volver</Button>
        <Button name="Siguiente" onClick={clickHandler}>Continuar</Button>
    </>

    const thirdPage = <>
        <Box>
            <InputLabel>Teléfono</InputLabel>
            <Field name='phone' as={TextField} />
            <ErrorMessage name='phone'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>¿Estudias o trabajas en alguna de estas areas?</InputLabel>
            <Field as={Select} name="profession">
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="Yes">Sí</MenuItem>
                <MenuItem value="No">No</MenuItem>
            </Field>
            <ErrorMessage name='profession'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>Estudios alcanzados</InputLabel>
            <Field as={Select} name="studies">
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="Primario">Educación Inicial</MenuItem>
                <MenuItem value="Secundario">Educación Primaria</MenuItem>
                <MenuItem value="Terciario">Educación Secundaria</MenuItem>
                <MenuItem value="Superior">Educación Superior</MenuItem>
            </Field>
            <ErrorMessage name='studies'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Box>
            <InputLabel>¿Con qué genero te identificas?</InputLabel>
            <Field as={Select} name="gender">
                <MenuItem value="">Select an option</MenuItem>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="No binario">No binario</MenuItem>
                <MenuItem value="Otro">Otro</MenuItem>
            </Field>
            <ErrorMessage name='gender'>
                {msg => <Typography color="error">{msg}</Typography>}
            </ErrorMessage>
        </Box>
        <Button name="Anterior" onClick={clickHandler}>Volver</Button>
        <Button type='submit'>Finalizar</Button>
    </>

    return (
        <Formik
            initialValues={{ //Valores iniciales de Formik, la equivalencia Vanilla sería ir almacenando los datos en el estado local...
                profilePhoto: "",
                name: "",
                lastName: "",
                birthdayDate: "",
                nationality: "",
                country: "",
                cityTimeZone: "",
                email: "",
                phone: "",
                profession: "",
                studies: "",
                gender: ""
            }}
    validationSchema={validationSchema}
            onSubmit={submitHandler}
        >
            {(formik) => {
                return (
                    <Form>
                        {index === 0 ? firstPage : null}
                        {index === 1 ? secondPage : null}
                        {index === 2 ? thirdPage : null}
                        {formik.errors && Object.keys(formik.errors).length > 0 &&
                            <Typography>Hay errores en los campos. Por favor, revíselos.</Typography>
                        }
                    </Form>
                )
            }}
        </Formik>
    )
}