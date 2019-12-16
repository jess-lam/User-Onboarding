import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const OnboardForm = ({values, errors, touched, status}) => {
    console.log("values", values);
    console.log("errors", errors);
    console.log("touched", touched);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log("status has changed!", status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    return (
        <div className="onboarding-form">
            <Form>
                <label htmlFor="name">
                    Name 
                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Full name"
                    />
                    {touched.name && errors.name && (
                    <p className="errors">{errors.name}</p>
                    )}
                </label>
                <label htmlFor="email">
                    Email
                    <Field id="email" type="text" name="email" placeholder="Email"/>
                    {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
                    )}
                </label>
                <label htmlFor="password">
                    Password 
                    <Field id="password" type="text" name="password" placeholder="Password"/>
                    {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                    )}
                </label>
                <label className="checkbox-container">
                    Terms of Service
                    <Field type="checkbox" name="termsOfService" checked={values.termsOfService}/>
                </label>
                <button type="submit">Submit</button>
            </Form>
            {users.map(user => {
                return (
                    <ul key={user.id}>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Password: {user.password}</li>
                        <li>Terms of Service: {user.termsOfService}</li>
                    </ul>
                );
            })}
        </div>
    )
}

const FormikOnboardForm = withFormik({
    mapPropsToValues(props) {
        return {
            name: props.name || "",
            email: props.email || "",
            password: props.password || "",
            termsOfService: props.termsOfService || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),

    handleSubmit(values, {setStatus, resetForm}) {
        console.log("submitting", values);
        axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
            console.log("success", res);
            setStatus(res.data);
            resetForm();
        })
        .catch(err => console.log(err.res));
    }
})(OnboardForm);

export default FormikOnboardForm;