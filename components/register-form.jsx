"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signUp_validate } from "@/lib/validate"
import { useFormik } from "formik"


const RegisterForm = () => {
    
    const router = useRouter();
    const [checkInfo, setCheckInfo] = useState(false);
    const [reqMessage, setReqMessage] = useState("");

    const formik = useFormik({
        initialValues:{
            name: "",
            email: "",
            password: "",
        },
        validate: signUp_validate,
        onSubmit
    })

    async function onSubmit(values){
        console.log(values);
        const options = {
            method: "POST",
            headers: {'Contect-Type': "application/json"},
            body: JSON.stringify(values)
        };

        const res = await fetch(`/api/users/register`,options);
        const data = await res.json();

        if(res.ok && res.status === 201){
            router.push("./login");
            formik.resetForm();
        }else{
            setReqMessage(data.message)
        }
    }

    return (
        <div className="user-form">
            <div className="form-title">
                <h3>Get Started</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="name">
                    <span>Name</span>
                    <input type="text" placeholder="Enter your user name..." id="name" name="name" {...formik.getFieldProps("name")} />
                    {formik.errors.name && formik.touched.name ? <span>{formik.errors.name}</span> : ""}
                </label>
                <label htmlFor="email">
                    <span>Email</span>
                    <input type="email" placeholder="Enter your user name..." id="email" name="email" {...formik.getFieldProps("email")} />
                    {formik.errors.email && formik.touched.email ? <span>{formik.errors.email}</span> : ""}
                </label>
                <label htmlFor="password">
                    <span>Password</span>
                    <input type="password" placeholder="Enter your user name..." id="password" name="password" {...formik.getFieldProps("password")} />
                    {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : ""}
                </label>
                <button type="submit">
                    Sign Up
                </button>
                {reqMessage}
            </form>

        </div>
    )
}

export default RegisterForm