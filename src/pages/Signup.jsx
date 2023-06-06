import React, { useState } from "react";
import Helmet from "../commponents/Helmet/Helmet";
import styles from "../styles/styles.module.css"
import { Link } from "react-router-dom";
import { Switch } from "@mui/material";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { SERVER_URL } from "../Domain";
const Signup = () => {
  const [data, setData] = useState({
    pseudo: "",
    password: "",
    email: "",
    confirmnewpassword: ""

  })
  const [error, setError] = useState("")
  const [checked, setChecked] = useState(false)
  const [loading, setloading] = useState(false)//boolean pour le loading de submit button
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setloading(true)
    if (data.password !== data.confirmnewpassword) {
      setError("password are not equal")
      setTimeout(() => {
        setError("")
      }, 5000)
    }
    if (data.password === data.confirmnewpassword) {
      axios({
        method: "post",
        url: `${SERVER_URL}/api/user/register`,
        withCredentials: true,
        data: data,
      })
        .then((res) => {
          if(res.data.errors){
            setloading(false)
          if (res.data.errors.pseudo) {
            setError(res.data.errors.pseudo);
            console.log(res.data.errors.pseudo);
            setTimeout(() => {
              setError("")
          }, 5000)
          }
          if (res.data.errors.email) {
            setError(res.data.errors.email);
            setTimeout(() => {
              setError("")
          }, 5000)
           }
          if (res.data.errors.password) {
            setError(res.data.errors.password);
            setTimeout(() => {
              setError("")
          }, 5000)
          }
        }
          if (!res.data.errors) {
            setTimeout(() => {
              document.title="Redirecting....."
              window.location = "/login"
          }, 5000)
          }
        })
        .catch((err) => {
          setloading(false)
          setError(err.message)
        });
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
    <Helmet title={"Signup"}>
      <div className={styles.container_signup}>
        <div className={styles.signup_form_container}>
          <div className={styles.left}>
            <h1>Welcome Back</h1>
            <Link to="/login">
              <button className={styles.white_button}>Sign in</button>
            </Link>
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
              <h1>Create Account</h1>
              <input
                type="text"
                placeholder="User name"
                name="pseudo"
                value={data.pseudo}
                required
                className={styles.input}
                onChange={handleChange}
              />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                required
                className={styles.input}
                onChange={handleChange}
              />
              <input
                type={checked ? "text" : "password"}
                placeholder="Create password"
                name="password"
                value={data.password}
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
                    <><Switch onClick={() => showpassword("checked")} /><p>show password</p></>
                }
              </div>
              {
                error && <div className={styles.error_msg}>{error}</div>
              }
              
              <button type="submit" className={styles.green_btn}>
              <LoadingButton loading={loading}  sx={
               { padding: "0px",
              height:"10px",
              color:"white",
              textTransform:"lowercase"}}>
              Sign up
              </LoadingButton>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Helmet >
  );
};
export default Signup;