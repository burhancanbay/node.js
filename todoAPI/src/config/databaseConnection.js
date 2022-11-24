const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.lch20id.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
(e) => {
    if (e) {
        console.log("cannot connect to DB", e)
    } else {
        console.log("connected to DB")
    }
})


