const express = require('express');
const app = express();
const port = 3000;

require("dotenv").config();
const router = require("./routes/routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;