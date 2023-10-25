const express = require("express");
const fs = require("fs");

const PORT = 8008;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello GET Method");
});
app.post("/", (req, res) => {
  res.send("Hello POST Method");
});
app.put("/", (req, res) => {
  res.send("Hello PUT Method");
});
app.delete("/", (req, res) => {
  res.send("Hello DELETE Method");
});

app.listen(PORT, () => console.log(`Server is listening at ${PORT} port`));
