const express = require("express");
const productsRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const mongoose = require("mongoose");
require("dotenv/config");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./middleware/verifyToken");

const app = express();

app.use(bodyParser.json());

app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lch20id.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
(e) => {
    if(e) {
        console.log(e);
    } else {
        console.log("connected to db");
    }
}
)


const isLoggedIn = true;

app.use((req, res, next) => {
    if(!isLoggedIn) {
        res.send("you must be logged in to view this page");
    } else {
        next();
    }
});

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/auth", authRouter);
app.use("/products", verifyToken, productsRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});