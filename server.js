const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/users");
const dogs = require("./routes/dogs");

const app = express();
const port = 5000;

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport);

// DB connection
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("Database connected."))
  .catch(err => console.log(err));

// Routes
app.use("/api/users", users);
app.use("/api/dogs", dogs);

app.listen(port, () =>
  console.log(
    `||================================|| Example app listening on port ${port}! ||================================||`
  )
);
