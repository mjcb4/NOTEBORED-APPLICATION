import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email Invalid, Must Be Correct Format').required('Required'),
    password: Yup.string()
        .min(5, 'Password Too Short, Must Be Longer Than 5 Characters')
        .max(50, 'Password Too Long, Must Be Shorter Than 50 Characters')
        .required('Required'),
})

const LoginForm = ({ onLoginSuccess }) => {
    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
                try {
                    const response = await axios.post('http://localhost:4000/profile/login', values);
                    console.log('Login Success:', response.data);
                    resetForm()
                    onLoginSuccess() 
                } catch (error) {
                    setErrors({ server: error.response?.data?.message || 'Login failed. Please try again later.' });
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Field name="email" type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />

                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />

                    {errors.server && <div>{errors.server}</div>}  {/* Display server-side errors */}

                    <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
            )}
        </Formik>
    )
}

export default LoginForm