const mongoose = require("mongoose");
const { mongo } = require("./variables");

mongoose.Promise = Promise;

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
  process.exit(-1);
});

exports.connect = () => {
  mongoose
    .connect(mongo.uri, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected..."));

  return mongoose.connection;
};
