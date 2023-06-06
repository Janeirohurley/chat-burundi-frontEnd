import React, { useState } from "react";
import Helmet from "../commponents/Helmet/Helmet";
import styles from "../styles/login.module.css";
import { Link} from "react-router-dom";
import { Switch } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import axios from "axios";
import { SERVER_URL } from "../Domain";
const Login = () => {
  const [data, setData] = useState({
    pseudo: "",
    password: "",
  });
  
  const [error, setError] = useState(""); //initializing error
  const [checked, setChecked] = useState(false); //boolean pour un switch de show password et hide password
  const [loading, setloading] = useState(false); //boolean pour le loading de submit button
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    axios({
      method: "post",
      url: `${SERVER_URL}/api/user/login`,
      withCredentials: true,
      data: data,
    })
      .then((res) => {
        if (res.data.errors) {
          //si il y a une erreur
          setloading(false);
          if (res.data.errors.pseudo) {
            //errerur de pseudo
            setError(res.data.errors.pseudo);
            setTimeout(() => {
              setError("");
            }, 5000);
          }
          if (res.data.errors.password) {
            //erreur de password
            setError(res.data.errors.password);
            setTimeout(() => {
              setError("");
            }, 5000);
          }
        }
        if (!res.data.errors) {
          localStorage.setItem("token", res.data.token);
          document.title = "Redirecting.....";
          document.location = "/";
        }
      })
      .catch((err) => {
        setloading(false);
        setError(err.message);
      });
  };
  const showpassword = (control) => {
    if (control === "checked") {
      setChecked(true);
    } else if (control === "notchecked") {
      setChecked(false);
    }
  };
  return (
    <Helmet title={"Login"}>
      <div className={styles.container_login}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form onSubmit={handleSubmit} className={styles.form_container}>
              <h1>Login to Your Account</h1>
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
                type={checked ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={data.password}
                required
                className={styles.input}
                onChange={handleChange}
              />
              <div className={styles.checkbox}>
                {checked ? (
                  <>
                    <Switch
                      controlled
                      checked
                      onClick={() => showpassword("notchecked")}
                    />
                    <p>hide password</p>
                  </>
                ) : (
                  <>
                    <Switch
                      controlled
                      onClick={() => showpassword("checked")}
                    />
                    <p>show password</p>
                  </>
                )}
              </div>
              {error && <div className={styles.error_msg}>{error}</div>}
              
                <button type="submit" className={styles.green_btn}>
                <LoadingButton loading={loading} sx={
                  { 
                    padding: "0px",
              height:"10px",
              color:"white",
              textTransform:"lowercase"
            }

                }>
                  Sign in
                  </LoadingButton>
                </button>
              
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button className={styles.white_button}>Sign up</button>
            </Link>
            <br />
            <h1>Or</h1>
            <Link to="/account-verification">forget password ??</Link>
          </div>
        </div>
      </div>
    </Helmet>
  );
};
export default Login;
