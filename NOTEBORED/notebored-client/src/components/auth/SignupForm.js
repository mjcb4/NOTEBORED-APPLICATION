import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import axios from 'axios'

const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username Too Short, Must Be Longer Than 2 Characters')
        .max(20, 'Username Too Long, Must Be Shorter Than 20 Characters')
        .required('Required'),
    email: Yup.string().email('Email Invalid, Must Be Correct Format').required('Required'),
    password: Yup.string()
        .min(5, 'Password Too Short, Must Be Longer Than 5 Characters')
        .max(50, 'Password Too Long, Must Be Shorter Than 100 Characters')
        .required('Required'),
})

const SignupForm = ({ onSignupSuccess }) => {
    return (
        <Formik
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
                try {
                    const response = await axios.post('http://localhost:4000/profile/signup', values);
                    console.log('Signup Success:', response.data);
                    onSignupSuccess()
                    resetForm()
                } catch (error) {
                    setErrors({ server: error.response?.data?.message || 'Signup failed. Please try again later.' });
                } finally {
                    setSubmitting(false)
                }
            }}
        >
            {({ isSubmitting, errors }) => (
                <Form>
                    <Field name="username" type="text" placeholder="Username" />
                    <ErrorMessage name="username" component="div" />

                    <Field name="email" type="email" placeholder="Email" />
                    <ErrorMessage name="email" component="div" />

                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" component="div" />

                    {errors.server && <div>{errors.server}</div>} {/* Display server-side errors */}

                    <button type="submit" disabled={isSubmitting}>Sign Up</button>
                </Form>
            )}
        </Formik>
    )
}
    
export default SignupForm