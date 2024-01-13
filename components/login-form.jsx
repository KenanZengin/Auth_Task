"use client"


import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn_validate, signUp_validate } from "@/lib/validate"
import { useFormik } from "formik"
import { signIn } from "next-auth/react"


const LoginForm = () => {

    const router = useRouter();
    const [errorMessage,setErrorMessage] = useState("")

    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },
        validate: signIn_validate,
        onSubmit
    })

    async function onSubmit(values){
        console.log(values);
        const status = await signIn("credentials",{
            redirect: false,
            email : values.email,
            password : values.password, 
        }).then(res => {
                if(res.ok){
                    router.push("/");
                    router.refresh();
                }else{
                    setErrorMessage(() => res.error)
                }
        }).catch(error => setErrorMessage(() => error))
    }


    return (
    <div className="login-form">
        <div className="form-title">
            <h3>Welcome</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">
                <span>Email</span>
                <input type="email" name="email" id="email" placeholder="Enter your email" {...formik.getFieldProps("email")} />
                {formik.errors.email && formik.touched.email ? <span >{formik.errors.email}</span> : ""}
            </label>
            <label htmlFor="password">
                <span>Password</span>
                <input type="password" name="password" id="password" placeholder='Enter your password' {...formik.getFieldProps("password")} />
                {formik.errors.password && formik.touched.password ? <span>{formik.errors.password}</span> : ""}
            </label>
            <button type="submit">Login</button>
        </form>
        {errorMessage}
    </div>
    )
}

export default LoginForm