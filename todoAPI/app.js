const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 5001
const todoRouter = require("./src/routers/todoRouter")
require("./src/config/databaseConnection")



app.use(express.json())

app.use("/api", todoRouter)

app.get("/", (req, res) => {
    res.send("wellcome")
});



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
