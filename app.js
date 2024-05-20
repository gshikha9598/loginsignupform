require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const app = express();
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use("/", router);


//server start
app.listen(PORT, () => {
    console.log(`server start at ${PORT}`);
});