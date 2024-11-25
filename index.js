const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const { mongoDBConnected } = require("./connect");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticsRouter");
const userRouter = require("./routes/user");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = 9001;

mongoDBConnected("mongodb://127.0.0.1:27017/url-shortner").then(() => console.log("MongoDb is Connected"));

// i set view engine i want to use server side rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// custom middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Registered Routes
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRouter);

app.listen(PORT, () => console.log(`Server is Started at PORT No: ${PORT}`));