// const express = require("express");
// const bcrypt = require("bcrypt");

// const app = express();

// console.log("It's Happening !!!");
// app.use(express.json());

// const isValid = (req, res, next) => {
//   console.log(req.body.password);
//   if (req.body.email.length != 0 && req.body.password != 0) next();
//   else res.send("One or more Inputs are Empty !");
// };
// app.use(isValid, async (req, res, next) => {
//   const salt = await bcrypt.genSalt(10);
//   const secPass = await bcrypt.hash(req.body.password, salt);
//   console.log(secPass);
//   console.log("It's in the hashing Middleware");
//   res.send("Got te Response");
// });
// app.listen(3000, () => console.log("App is listening on 3000 port"));

const express = require("express");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const moment = require("moment");

require("dotenv").config();

const { SECRETKEY } = require("./Constants");

const app = express();

app.use(express.json());
console.log(moment().format(`d MMMM yyyy, dddd , h:mm:ss a`));
const now = new Date();
const t = new Intl.DateTimeFormat("ps").format(now);
console.log(t);

console.log(process.env.USER_KEY);

const isValid = (req, res, next) => {
  console.log(req.body.password);
  if (req.body.email.length != 0 && req.body.password != 0) next();
  else res.send("email or password is Empty !");
};
app.post("/", isValid, async (req, res, next) => {
  //Encryption
  const cypherText = CryptoJS.AES.encrypt(
    req.body.password,
    SECRETKEY
  ).toString();
  console.log("Encrypted = ", cypherText);

  const token = jwt.sign(req.body, SECRETKEY);
  console.log("Token = ", token);
  const decoded = jwt.verify(token, SECRETKEY, (err, decoded) => {
    if (err) console.log("Got the Error!");
    else console.log("Decoded = ", decoded);
  });
  //console.log("Decoded = ", decoded);
  res.send("Got te Response");
});
app.listen(3000, () => console.log("App is listening on 3000 port"));
