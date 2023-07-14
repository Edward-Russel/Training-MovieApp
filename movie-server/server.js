const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 3000;

app.use(cors());

app.get(/\.jpg$/, (req, res) => {
  fetch(`http://image.tmdb.org/t/p/w500${req.path}`, { method: "GET" })
    .then((result) => result.arrayBuffer())
    .then((result) => {
      res.header("Content-Type", "image/jpeg");
      res.send(Buffer.from(result));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send()
    });
});

app.get("/movie", (req, res) => {
  if (req.query.page === "1") {
    fs.readFile(path.resolve(path.join("db", "page.json")), (err, data) => {
      if (err) throw Error(err);
      res.header("Content-Type", "application/json");
      res.send(data);
    });
  } else {
    res.redirect("/");
  }
});

app.get("/genres", (req, res) => {
  fs.readFile(path.resolve(path.join("db", "genres.json")), (err, data) => {
    if (err) throw Error(err);
    res.header("Content-Type", "application/json");
    res.send(data);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
