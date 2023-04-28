import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});

const submitHandler = (values) => {

  // const [info, setInfo] = useState({
  //   data: {},
  //   error: ""
  // })

  const { email, password } = values;

    axios.get('http://localhost:3001/getBothRoles', {
      data: {
        email,
      password
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  // try {
  //   const response = await axios.get(`http://localhost:3001/getBothRoles?email=${email}&password=${password}`)
  //   const { data } = response;
  //   setInfo({
  //     ...info,
  //     data,
  //   })

  //   } catch (error) {
  //   const { response } = error;
  //   const { data } = response;
  //   setInfo({
  //     ...info,
  //     error: data
  //   })
  // }
}

const LoginForm = ({ handleMouseLeave }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="email">E-mail</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label htmlFor="password">Contraseña</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <div>
            <button type="submit" disabled={isSubmitting}>
              Iniciar Sesión
            </button>
            <button onClick={() => handleMouseLeave()}>Cancelar</button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;