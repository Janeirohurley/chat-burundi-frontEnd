import React, { useState } from "react";
import Helmet from "../commponents/Helmet/Helmet";
import styles from "../styles/login.module.css"
import { Link, useParams,useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SERVER_URL } from "../Domain";
import axios from "axios";
const Forgetpassword = () => {
    const [data, setData] = useState({
        newpassword: "",
        confirmnewpassword: "",
    })
    const params = useParams()
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [checked, setChecked] = useState(false)
    const [loading,setloading] = useState(false)
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (data.newpassword !== data.confirmnewpassword) {
            setError("password are not equal")
            setTimeout(() => {
                setError("")
            }, 5000)
        }
                if (data.newpassword === data.confirmnewpassword) {
                    setloading(true)
             axios({
    method: "put",
    url: `${SERVER_URL}/api/user/changepassword/user`,
    data :{
         email:params.email,
         newpassword:data.newpassword
    },
    withCredentials : true
   }).then(({data})=>{
    setloading(false);
   if(data.message !=="password changed successifully"){
  setError(data.message)
              setTimeout(() => {
                setError("")
            }, 5000)
   }else{
    setSuccess(data.message)
    setTimeout(()=>{
        // window.location="/login"
        navigate("/login")
    },2000)
   }
   }).catch((err)=>console.log(err))
            
        }
    }
    const showpassword = (control) => {
        if (control === "checked") {
            setChecked(true)
        } else if (control === "notchecked") {
            setChecked(false)
        }
    };
    return (
        <Helmet title={"Changing password"}>
            <div className={styles.container_login}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form onSubmit={handleSubmit} className={styles.form_container}>
                            <h1>Changing password</h1>
                            <input
                                type="email"
                                value={params.email}
                                disabled
                                className={styles.input}
                            />
                            <input
                                type={checked ? "text" : "password"}
                                placeholder="create new password"
                                name="newpassword"
                                value={data.newpassword}
                                required
                                className={styles.input}
                                onChange={handleChange}
                            />
                            <input
                                type={checked ? "text" : "password"}
                                placeholder="Confirm your new password"
                                name="confirmnewpassword"
                                value={data.confirmnewpassword}
                                required
                                className={styles.input}
                                onChange={handleChange}
                            />
                            <div className={styles.checkbox}>
                                {
                                    checked ?
                                        <><Switch checked onClick={() => showpassword("notchecked")} /><p>hide password</p></>
                                        :
                                        <><Switch  onClick={() => showpassword("checked")} /><p>show password</p></>
                                }
                            </div>
                            {
                                error && <div className={styles.error_msg}>{error}</div>
                            }
                             {
                                success && <div className={styles.success_msg}>{success}</div>
                            }
                            <LoadingButton loading = {loading} sx={{padding:"0px"}} >
                            <button type="submit" className={styles.green_btn}>change password</button>
                            </LoadingButton>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>No needed ?</h1>
                        <Link to="/login">
                            <button className={styles.white_button}>Return to login</button>
                        </Link>
                    </div>
                </div>
            </div >
        </Helmet >
    )
}
export default Forgetpassword;