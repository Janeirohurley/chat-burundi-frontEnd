import React, { useState } from "react";
import Helmet from "../commponents/Helmet/Helmet";
import styles from "../styles/login.module.css"
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
const ResetPassword = () => {
    const [data, setData] = useState({
        newpassword: "",
        confirmnewpassword: "",
    })
    const [error, setError] = useState("")
    const [checked, setChecked] = useState(false)
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(data)
        if (data.newpassword !== data.confirmnewpassword) {
            setError("password are not  equal")
            setTimeout(() => {
                setError("")
            }, 5000)
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
        <Helmet title={"Resetting password"}>
            <div className={styles.container_login}>
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form onSubmit={handleSubmit} className={styles.form_container}>
                            <h1>Changing password</h1>
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
                            <LoadingButton sx={{padding:"0px"}} ><button type="submit" className={styles.green_btn}>change password</button></LoadingButton>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>No needed ?</h1>
                        <Link to="/">
                            <button className={styles.white_button}>Return to home</button>
                        </Link>
                    </div>
                </div>
            </div >
        </Helmet >
    )
}
export default ResetPassword;