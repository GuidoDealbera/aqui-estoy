import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be at least 6 characters').required('Required'),
});

const LoginForm = ({ onSubmit, handleMouseLeave }) => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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