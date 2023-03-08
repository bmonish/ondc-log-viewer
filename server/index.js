Promise = require("bluebird");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectMongoose = require("./connectToDB");
const _omitBy = require("lodash/omitBy");
const { isNullorUndefined } = require("./helpers");

const app = express();

connectMongoose.connect();

app.use(cors());

app.get("/status", (req, res) => {
  res.send("Server running");
});

app.get("/transaction", async (req, res) => {
  const query = _omitBy(req.query, (each) => isNullorUndefined(each));
  const transactions = await mongoose.connection.db
    .collection("logs")
    .find(query)
    .toArray();
  res.json(transactions);
});

app.listen(3500, () => console.log("Server running on port 3500"));
