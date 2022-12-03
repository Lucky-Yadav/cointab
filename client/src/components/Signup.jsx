import React from 'react'
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginloading, sucessLogin } from "../store/auth/action";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { LOGIN_LOADING } from "../store/auth/actiontype";
// import { AuthContext } from "../context/AuthContext";

const Signup = () => {
    
const token = useSelector((state) => state.auth.token);
const dispatch = useDispatch();
    const [loginData, setloginData] = useState({
        username: "",
  email: "",
  password: "",
});
// const handlelogout = () => {
//   dispatch(logoutsuccess());
// };

const handlechange = (e) => {
  const { name, value } = e.target;
  setloginData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handlelogin = () => {
  //  console.log(2);
  dispatch(loginloading());
  axios({
    method: "post",
    url: "http://localhost:3070/users/signup",
    data: loginData,
  }).then((res) => {
    dispatch(sucessLogin(res.data));
  });
};
if (token) {
  return <Navigate to={"/"} />;
}
return (
  <div>
    <div className="div">
      {Object.keys(loginData).map((el) => (
        <TextField
          key={el}
          value={loginData[el]}
          onChange={handlechange}
          name={el}
          id={el}
          label={el.toLocaleUpperCase()}
          variant="outlined"
          required
        />
      ))}
    </div>

    <div className="button">
      <br />
      <Button onClick={handlelogin} variant="contained" endIcon={<SendIcon />}>
        {token ? "log out" : "log in"}
      </Button>
    </div>
  </div>
);
}

export default Signup




