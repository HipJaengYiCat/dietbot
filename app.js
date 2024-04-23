// Install required modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
require('dotenv').config();

// Import Rounter moduls
const indexRouter = require("./routes/index");
const resultRouter = require("./routes/result");
const apiRouter = require("./routes/api");

const app = express();

// Security middleware settings
app.use(helmet());

// Logging middleware settings
if (process.env.NODE_ENV === "development") {
    app.use(logger("dev"));
} else {
    app.use(logger("short"));
}
//app.use(logger("dev"));

// Set up body parser and cookie parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set path for static file service
app.use(express.static(path.join(__dirname, "public")));

// Set rounters
app.use("/", indexRouter);
app.use("/result", resultRouter);
app.use("/api", apiRouter);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


// Export modules, 서버 실행은 bin > www 파일
module.exports = app;
