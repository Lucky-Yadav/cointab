const express = require("express");
const app = express();
const PORT = 3070;
const cors = require("cors");
var jwt = require("jsonwebtoken");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);

mongoose
  .connect(
    "mongodb+srv://user:wGPrQ0iGQM3rO4nZ@cluster0.zkwpvpy.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("handshake successful");
    app.listen(PORT, () => {
      console.log(`server started at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
