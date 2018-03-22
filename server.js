const express = require("express");
const request = require("request");

const app = express();
app.use("/static", express.static("static"));

app.get("/pdf", (req, res) => {
  res.header("Content-Type", "application/pdf");
  // Simulate getting a PDF from database, disk, etc.
  request
    .get("http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf")
    .pipe(res);
});

app.get("/", (req, res) => {
  res.redirect(301, "/static/index.html");
});

app.listen(3000, () => console.log("http://localhost:3000/"));
