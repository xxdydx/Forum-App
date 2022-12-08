const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const blogRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const path = require("path");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/blogs", blogRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
