const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const PORT = 3000;

const server_port = process.env.YOUR_PORT || process.env.PORT || 80;
const server_host = process.env.YOUR_HOST || "0.0.0.0";
server.listen(server_port, server_host, function () {
  console.log("Listening on port %d", server_port);
});

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//remove?
const databaseUrl = "workouts_db";
const collections = ["workouts"];
// mongodb+srv://evondunn:Milk40!!17@cluster0.ywhev.mongodb.net/workouts_db?retryWrites=true&w=majority

//mongodb://localhost/workouts_db
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workouts_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.get("/", (req, res) => {
  res.send(index.html);
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

//routes
app.use(require("./routes/api.js"));
app.use(require("./routes/view.js"));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}!`);
});

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://evondunn:Milk40%21%2117@cluster0.gkaou.mongodb.net/workouts_db?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
