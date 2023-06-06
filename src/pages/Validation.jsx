import React, { useState } from "react";
import Helmet from "../commponents/Helmet/Helmet";
import styles from "../styles/login.module.css"
import { LoadingButton } from "@mui/lab";
const Validation = () => {
    const [data, setData] = useState({
        email: "",
        OTP: "",
    })
    const [error, setError] = useState("")
    const [isVerifEmail,setisVerifEmail] = useState(true)
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
        if(data.email.endsWith("@gmail.com")){
            console.log("hellooo")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        if (data.email !== data.OTP) {
            setError("password are not equal")
            setisVerifEmail((ab)=>!ab)
            setTimeout(() => {
                setError("")
            }, 5000)
        }
    }
    return (
        <Helmet title={"Resetting password"}>
            <div className={styles.container_login}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form onSubmit={handleSubmit} className={styles.form_container}>
                            <h1>Ckecking  User</h1>
                            <input
                                type="email"
                                placeholder="Verify your email"
                                name="email"
                                value={data.email}
                                required
                                className={styles.input}
                                onChange={handleChange}
                                disabled={!isVerifEmail}
                            />
                            <input
                                type="text"
                                placeholder="Verify OTP from your Email"
                                name="OTP"
                                value={data.OTP}
                                required
                                disabled={isVerifEmail}
                                className={styles.input}
                                onChange={handleChange}
                            />
                            {
                                error && <div className={styles.error_msg}>{error}</div>
                            }
                            {
                                isVerifEmail ? 
                                (<LoadingButton sx={{ padding: 0,width:"10rem",margin:0 }} ><button type="submit" className={styles.green_btn}>Verify email</button></LoadingButton>):
                                (<LoadingButton sx={{ padding: 0,width:"10rem",margin:0 }} ><button type="submit" className={styles.green_btn}>Verify OTP</button></LoadingButton>)
                            }
                            
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>Ticks:</h1>
                        <ol>
                            <li>1. Ckeck ur email to get the validation code sent to your email</li>
                            <li>2. Put the Varidation code to precced</li><br/>
                            <p>After accepting all u will be redirecting to the changing password</p>
                        </ol>
                    </div>
                </div>
            </div >
        </Helmet >
    )
}
export default Validation;