require("dotenv").config({ path: "./.env" });
var createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;

// databaseconnection
require("./models/database").databaseconnection();

const indexRouter = require("./routes/indexRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "jk43t9",
    })
);
// app.use(
//     require("cors")({ origin: "http://localhost:3000", credentials: true })
// );

app.use(require("cors")({ credentials: true }));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("views/build"));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, "views", "build", "index.html"));
//     });
// }

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;
    res.status(500).json({ error: err });
});

if (process.env.PORT) {
    app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
}
