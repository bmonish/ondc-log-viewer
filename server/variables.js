const path = require("path");

require("dotenv-safe").config({
  path: path.join(__dirname, "../.env"),
  allowEmptyValues: true,
});

module.exports = {
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
  },
};
