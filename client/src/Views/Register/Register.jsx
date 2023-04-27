import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios"
import Box from '@mui/material/Box'
import { Button, Input, InputLabel, TextField, Typography, Stepper, StepLabel, Step } from '@mui/material';

export default function Register() {

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
            <Input type="file">
                <Field name="profilePhoto">
                    {({ field, form }) => (
                        <>
                            <input
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
            </Input>
            <Typography>
                <ErrorMessage name="profilePhoto" />
            </Typography>
        </Box>
        <Box>
            <InputLabel>Nombre</InputLabel>
            <TextField>
                <Field name="name" />
            </TextField>
            <Typography>
                <ErrorMessage name="name" />
            </Typography>
        </Box>
        <Box>
            <InputLabel>Apellido</InputLabel>
            <TextField>
                <Field name="lastName" />
            </TextField>
            <Typography>
                <ErrorMessage name="lastName" />
            </Typography>
        </Box>
        <Box>
            <InputLabel>Fecha de Nacimiento</InputLabel>
            <Input type='date'>
                <Field name="birthdayDate" type="date" />
            </Input>
            <Typography>
                <ErrorMessage name="birthdayDate" />
            </Typography>
        </Box>
        <Button sx={{
            marginTop: "10px"
        }} variant="outlined" name="Siguiente" onClick={clickHandler}>Continuar</Button>
    </>

    const secondPage = <>
        <div>
            <InputLabel>Nacionalidad</InputLabel>
            <Field as="select" name="nationality">
                <option value="">Select an option</option>
                <option value="Argentino">Argentino</option>
            </Field>
            <ErrorMessage name='nationality' />
        </div>
        <div>
            <label>Pais de residencia actual</label>
            <Field as="select" name="country">
                <option value="">Select an option</option>
                <option value="Argentina">Argentina</option>
            </Field>
            <ErrorMessage name='country' />
        </div>
        <div>
            <label>Ciudad / huso horario de residencia</label>
            <Field as="select" name="cityTimeZone">
                <option value="">Select an option</option>
                <option value="Santa Rosa">Santa Rosa</option>
            </Field>
            <ErrorMessage name='cityTimeZone' />
        </div>
        <div>
            <label>*E-mail</label>
            <Field name='email' />
            <ErrorMessage name='email' />
        </div>
        <button name="Anterior" onClick={clickHandler}>Volver</button>
        <button name="Siguiente" onClick={clickHandler}>Continuar</button>
    </>

    const thirdPage = <>
        <div>
            <label>Teléfono</label>
            <Field name='phone' />
            <ErrorMessage name='phone' />
        </div>
        <div>
            <label>¿Estudias o trabajas en alguna de estas areas?</label>
            <Field as="select" name="profession">
                <option value="">Select an option</option>
                <option value="Yes">Sí</option>
                <option value="No">No</option>

            </Field>
            <ErrorMessage name='profession' />
        </div>
        <div>
            <label>Estudios alcanzados</label>
            <Field as="select" name="studies">
                <option value="">Select an option</option>
                <option value="Primario">Educación Inicial</option>
                <option value="Secundario">Educación Primaria</option>
                <option value="Terciario">Educación Secundaria</option>
                <option value="Superior">Educación Superior</option>
            </Field>
            <ErrorMessage name='studies' />
        </div>
        <div>
            <label>¿Con qué genero te identificas?</label>
            <Field as="select" name="gender">
                <option value="">Select an option</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="No binario">No binario</option>
                <option value="Otro">Otro</option>
            </Field>
            <ErrorMessage name='gender' />
        </div>
        <button name="Anterior" onClick={clickHandler}>Volver</button>
        <button type='submit'>Finalizar</button>
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
                            <div>Hay errores en los campos. Por favor, revíselos.</div>
                        }
                    </Form>
                )
            }}
        </Formik>
    )
}