import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});

const submitHandler = async (values) => {

  const [ loginRequests, setLoginRequests ] = useState({
    companion: {
      response: {},
      error: {}
    },
    supervisor: {
      response: {},
      error: {}
    }
  })

  const { email, password } = values;

  try {
    const response1 = await axios("http://localhost:3001/getOneCompanion", {
      "email": email,
      "password": password
    });
    setLoginRequests({
      ...loginRequests,
      companion: {
        ...companion.error,
        response: response1
      }
    })
  } catch (error1) {
    console.log('Error en axios1:', error1);
  }
  
  try {
    const response2 = await axios("http://localhost:3001/getOneSupervisor", {
      "email": email,
      "password": password
    });

    setLoginRequests({
      ...loginRequests,
      supervisor: {
        ...companion.error,
        response: response1
      }
    })

  } catch (error2) {
    console.log('Error en axios2:', error2);
  }
  
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