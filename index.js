require("dotenv").config();
const cors = require("cors");
const { urlencoded, json } = require("express");
const express = require("express");
const app = express();
const router = require("./src/route/route_index");

app.use(express.static("public"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/v1/", router);

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "not found",
  });
});

app.listen(5000, (req, res) => {
  console.log("Tickitz Stringifyy Backend Succes Run on Port 5000");
});
