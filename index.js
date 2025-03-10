const path = require("node:path");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const httpStatusText = require("./utils/httpStatusText");

const app = express();

const corsOptions = {};

const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL).then(() => {
  console.log("Connected To MongoDB");
  app.listen(process.env.PORT || 5000, () => {
    console.log("App is running on port", process.env.PORT || 5000);
  });
});

const coursesRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");

app.use(express.json());

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// Global middleware for not found routes
app.all("*", (req, res, next) => {
  return res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this rosourse is not available",
  });
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    data: null,
  });
});
