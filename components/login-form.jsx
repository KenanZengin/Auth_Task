"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { signIn_validate } from "../lib/validate"
import { useFormik } from "formik"
import { signIn } from "next-auth/react"
import Loading from "./loading"
import { FaFingerprint } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";


const LoginForm = () => {

    const router = useRouter();
    const [checkForm,setCheckForm] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")


    //formik ile form'dan alıcağımız dataları, validate işlemlerini ve onSubmit olduğu zaman yapıcağımız işlemleri tanımlıyoruz.
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
        setCheckForm(true) //butona tıklandığını anı yakalıyoruz ve kullanıcı butona bastığı için loading componentini döndürüyoruz
        const status = await signIn("credentials",{ // auth credentials'a formdan aldığımız verileri yolluyoruz.
            redirect: false,
            email : values.email,
            password : values.password, 
        }).then(res => {
                if(res.ok){ // eğer ki res.ok ise işlem başarılı demektir.
                    router.push("/"); // kullanıcıyı ana sayfaya yolluyoruz
                    router.refresh(); // kullanıcı giriş yaptığında tekrardan render edilebilcek ifadeler olursa diye refresh() fonk. kullanıyoruz
                }else{
                    setErrorMessage(() => res.error) // res !== ok ise bi hata var demektir bu hatayı alıp errorMessage componentine yazıyor
                    setCheckForm(false) // artık hata aldığımız için loading componentini durduruyoruz.
                }
        }).catch(error => setErrorMessage(() => error)) // bunların dışında bir server hatası var ise hatayı alıp yine errorMessage componentine yazıyoruz.
    }

    return (
    <div className="user-form">
       <div className="user-form-wrapper">
        <div className="form-content">
            <div className="form-header">
                <div className="form-title">
                    <div className="title">
                        <h3>
                            Welcome
                        </h3>
                    </div>
                </div>
            </div>
            <div className="form-values">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">
                        <span>Email</span>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email" 
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
                            name="password" 
                            id="password" 
                            placeholder='Enter your password' 
                            {...formik.getFieldProps("password")}
                            className={formik.errors.password && formik.touched.password ? "errborder": ""} 
                        />
                        {formik.errors.password && formik.touched.password ? <span className="validate_message">{formik.errors.password}</span> : ""}
                        <FaFingerprint size={20} />
                    </label>
                    {formik.isValid 
                        ?  
                            <button type="submit"  >
                                {checkForm ? <Loading /> : "Login"}
                            </button>
                        :
                            <div className='form_div' >
                                Login
                            </div>
                    }
                </form>
                {errorMessage.length > 0 
                    ? 
                        <div className="req-message">
                            {errorMessage}
                        </div> 
                    :
                        ""
                }
                <div className="have-account">
                    <p>Don't have an account? Sign up now</p>
                    <Link href={"./register"}>
                        Signup
                    </Link>
                </div>
            </div>
        </div>
       </div>
    </div>
    )
}

export default LoginForm