const express = require("express");
const cors = require("cors");
const ip = require("ip")
const app = express();
const port = 3000;
const ipAddr = ip.address();

let lastHouseVisited;

app.use(cors());
//app.use("/", require("./routes/start"));
app.use(express.json());
app.use(express.static("public"));

app.use("/", require("./routes/start"));

app.get("/tutu", (req, res) => {
  return res.json({message : lastHouseVisited})
})

app.post("/tutu", (req,res) => {
  lastHouseVisited=req.body.lastHouseVisited;
  return res.json({message : lastHouseVisited})
  
})

console.log(lastHouseVisited)

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Server run :" + ipAddr +":3000");
  });
};

initializeApp();
