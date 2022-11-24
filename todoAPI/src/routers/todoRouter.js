const express = require("express")

const router = express.Router()

//const router = require("express").Router()

const todoController = require("../controllers/todoController")

router.put("/todo/:id",todoController.todoUpdate)

router.post("/todo", todoController.todoAdd)

router.get("/todo", todoController.todoGetAll)

router.get("/todo/:id", todoController.todoGetDetail)

router.delete("/todo/:id", todoController.todoDelete)


module.exports = router