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

const app = express();

app.use(express.json());

const isValid = (req, res, next) => {
  console.log(req.body.password);
  if (req.body.email.length != 0 && req.body.password != 0) next();
  else res.send("email or password is Empty !");
};
app.use(isValid, async (req, res, next) => {
  const secretKey = ")V@Ln3_Az=+G9xr+";
  //Encryption
  const cypherText = CryptoJS.AES.encrypt(
    req.body.password,
    secretKey
  ).toString();
  console.log(cypherText);
  res.send("Got te Response");
});
app.listen(3000, () => console.log("App is listening on 3000 port"));
