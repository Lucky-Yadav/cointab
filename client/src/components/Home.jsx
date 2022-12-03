import { Button, Input, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);
  const [taskdata, settaskdata] = useState("")
   const [tododata, settododata] = useState({
     name: "",
     status: "",
     tag: "",
   });
    const handlechange = (e) => {
      const { name, value } = e.target;
      settododata((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    
  const addtask = () => {
    console.log(1)
      axios({
        method: "post",
        url: "http://localhost:3070/users/todo",
        data: tododata,
      }).then((res) => {
        // localStorage.setItem("logindata", JSON.stringify(loginData));
        console.log(res);
      });
  }
  return (
    <div>
      <h3> Name :- {username}</h3>
      <h3> Email :- {email}</h3>
      <div className="tasks">
        <div className="taskinput">
          {Object.keys(tododata).map((el) => (
            <TextField
              key={el}
              value={tododata[el]}
              onChange={handlechange}
              name={el}
              id={el}
              label={el.toLocaleUpperCase()}
              variant="outlined"
              required
            />
          ))}
        </div>
        <div className="tasksubmit">
          <Button
            onClick={() => addtask()}
            variant="contained"
            endIcon={<SendIcon />}
          >
            Add Task
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home