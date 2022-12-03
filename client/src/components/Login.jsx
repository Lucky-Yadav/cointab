import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginloading, sucessLogin } from "../store/auth/action";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [axioserr, setaxioserr] = useState("")
  
const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [loginData, setloginData] = useState({
        email: "",
        password:""
    })
  

  const handlechange = (e) => {     
        const { name, value } = e.target;
        setloginData(prev => ({
            ...prev,
            [name]:value
        }))
  }

  const handlelogin = () => {
      //  console.log(1);
        dispatch(loginloading());
        axios({
          method: "post",
          url: "https://cointab-psi.vercel.app/users/signin",
          data: loginData,
        })
          .then((res) => {
            dispatch(sucessLogin(res.data));
            let token = res.data.token;
            localStorage.setItem("logindata", JSON.stringify(loginData));
            console.log(res, token);
          })
          .catch((err) => {
            console.log(err);
            setaxioserr(err.response.data.message);
          });
  }
  if (token) {
    return <Navigate to={"/"}/>
  }
  return (
    <div>
      <div className="div">
        {Object.keys(loginData).map((el) => (
          <TextField key={el}
            value={loginData[el]}
            onChange={ handlechange}
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
        <Button
          onClick={ handlelogin}
          variant="contained"
          endIcon={<SendIcon />}
        >
          {token ? "log out" : "log in"}
        </Button>
      </div>
      <div className="err">{ axioserr}</div>
    </div>
  );
};

export default Login;
