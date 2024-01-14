"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signUp_validate } from "../lib/validate"
import { useFormik } from "formik"
import Loading from "./loading"
import { FaRegUser, FaFingerprint } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";


const RegisterForm = () => {
    
    const router = useRouter();
    const [checkInfo,setCheckInfo] = useState(false)
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
        setCheckInfo(true)
        const options = {
            method: "POST",
            headers: {'Contect-Type': "application/json"},
            body: JSON.stringify(values)
        };

        const res = await fetch(`/api/users/register`,options); // formdan aldığımız kullanıcı bilgileri Post methodu ile api klasörümüze iletiyoruz.
        const data = await res.json();

        if(res.ok && res.status === 201){ // eğer ki kullanıcı oluşmuş ise bize status , 201 döncek ve res.ok olucağı için kullanıcıyı login sayfasına yönlendiriyoruz
            router.push("./login");
            formik.resetForm();
        }else{
            setReqMessage(data.message) // kullanıcı oluşmamış ise bir problem vardır bu problemi reqMessage'e set ediyoruz.
            setCheckInfo(false) // loading'i iptal ediyoruz
        }
    }

    return (
        <div className="user-form">
           <div className="user-form-wrapper">
                <div className="form-content">
                    <div className="form-header">
                        <div className="title">
                            <h3>
                                Get Started
                            </h3>
                        </div>
                        <div className="info">
                            <p>
                                Let's create your account first
                            </p>
                        </div>
                    </div>
                    <div className="form-values">
                        <form onSubmit={formik.handleSubmit}>
                            <label htmlFor="name">
                                <span>Name</span>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    placeholder="Your user name..." 
                                    {...formik.getFieldProps("name")}
                                    className={formik.errors.name && formik.touched.name ? "errborder": ""} />
                                {formik.errors.name && formik.touched.name ? <span className="validate_message">{formik.errors.name}</span> : ""}
                                <FaRegUser size={20} />
                            </label>
                            <label htmlFor="email">
                                <span>Email</span>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    placeholder="Your mail address..." 
                                    {...formik.getFieldProps("email")}
                                    className={formik.errors.email && formik.touched.email ? "errborder": ""} 
                                />
                                {formik.errors.email && formik.touched.email ? <span className="validate_message">{formik.errors.email}</span> : ""}
                                <MdOutlineEmail size={20} />
                            </label>
                            <label htmlFor="password">
                                <span>Password</span>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password" 
                                    placeholder="Your password..." 
                                    {...formik.getFieldProps("password")} 
                                    className={formik.errors.password && formik.touched.password ? "errborder": ""} 
                                />
                                {formik.errors.password && formik.touched.password ? <span className="validate_message">{formik.errors.password}</span> : ""}
                                <FaFingerprint size={20} />
                            </label>
                            {formik.isValid 
                                ?  
                                    <button type="submit"  >
                                    {checkInfo ? <Loading /> : "Sign Up"}
                                    </button>
                                :
                                    <div className='form_div' >
                                        Sign Up
                                    </div>
                            }
                            
                        </form>
                        {reqMessage.length > 0 
                                ? 
                                    <div className="req-message ">
                                        {reqMessage}
                                    </div> 
                                :
                                    ""
                        }
                        <div className="have-account">
                            <p>Already have an account? </p>
                            <Link href={"./login"}>
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default RegisterForm