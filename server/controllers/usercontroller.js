const userModel = require("../Models/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Secret_key"
const schedule = require("node-schedule");
const signup = async (req, res) => {
    
    const { username, email, password } = req.body;

    try {
        const existinguser = await userModel.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ message: "User already exists"})
        }
        const hashpassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashpassword,
            username:username
        })

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({user : result,token : token})
    } catch (error) {
        console.log(error);
        res.status(501).json({message : "something went wrong"})
    }
    
};
var countWrongPass = 1
const allowedattempts = 5
var allowlogin = true
const signin = async (req, res) => {
  const { email, password } = req.body;
   if (countWrongPass >= allowedattempts ) {
     allowlogin = false;
     const job = schedule.scheduleJob("* * */1 * *", () => {       
       allowlogin = true;
       console.log("true");
       countWrongPass = 0;
       job.cancel();
     });
   }   

  if (allowlogin === true) {
     try {
      const existinguser = await userModel.findOne({ email: email });
      if (!existinguser) {
        return res.status(400).json({ message: "User not found" });
      }
      const matchpassword = await bcrypt.compare(
        password,
        existinguser.password
      );
      if (!matchpassword) {
          countWrongPass++;
            return res.status(400).json({ message: "Invalid credentials" });
          
      } else {
        countWrongPass = 0;
      }
      const token = jwt.sign(
        { email: existinguser.email, id: existinguser._id },
        SECRET_KEY
      );
      res.status(201).json({ user: existinguser, token: token });
    } catch (err) {
      console.log(err);
    }
  } else {
    return res.status(400).json({ message: "user blocked for 24 hours" });
  }  
 
};


module.exports = {signin,signup};