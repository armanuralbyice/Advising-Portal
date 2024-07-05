const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const SemesterRouter = require("../server1/router/semester");
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "https://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
    })
);
// app.use(cors())
const PORT = process.env.PORT;
const DB = process.env.DB;
mongoose.set("strictQuery", true);
mongoose
    .connect(DB)
    .then(() => console.log("Database connection successfully"))
    .catch((err) => console.log(err));
app.use("/semester", SemesterRouter);

app.listen(PORT, () => {
    console.log(`Listening port is ${PORT}`);
});