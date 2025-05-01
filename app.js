require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Database Connection
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Database connected successfully"))
    .catch((err) => console.error("❌ Database connection error:", err));

// ✅ Routes
app.get("/", (req, res) => {
    res.send("<h1 style='text-align: center; font-size: 50px'>Hello From Blog API</h1>");
});

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/user", require("./src/routes/user.routes"));
app.use("/api/blog", require("./src/routes/blog.routes"));
app.use("/api/comment", require("./src/routes/comment.routes"));
// app.use("/api/like", require("./src/routes/like.routes"));


// ✅ Handle 404 errors
app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
