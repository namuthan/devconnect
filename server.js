const express = require("express");
const dbUtils = require("./api/utils/database");
const _ = require("dotenv").config();
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");

const users = require("./api/routes/users");
const profiles = require("./api/routes/profiles");
const posts = require("./api/routes/posts");

const app = express();

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan("dev"));
require("./config/passport")(passport);

// connect to db
const url = `mongodb://${process.env.MONGO_DB_USERNAME}:${
  process.env.MONGO_DB_PASS
}${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${
  process.env.MONGO_DB_NAME
}`;

dbUtils
  .connect(url)
  .then(() => console.log("Successfully connected to DB 😀"))
  .catch(err => console.log(`Error Connecting to the mongo DB ${error}`));

// set up routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);

// start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 😁`);
});
