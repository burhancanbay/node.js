const { json } = require("express")
const todo = require("../models/todoModel")

const todoGetDetail = async(req, res) => {
    try {
        const todoGetDetail = await todo.findById(req.params.id)
        if(todoGetDetail) {
            return res.status(200).json({
                success: true,
                data: todoGetDetail
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "cannot be gotten"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "cannot be gotten"
        })
    }
}

const todoUpdate = async(req, res) => {
   
    try {
        
        const todoUpdate = await todo.findByIdAndUpdate(req.params.id, req.body)
        if(todoUpdate) {
            return res.status(200).json({
                success: true,
                message: "updated"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "cannot updated"
            })
        }
    } catch (error) {
        return res.status(500);json({
            success: false,
            message: "cannot updated  "+ error
        })
    }
}

const todoGetAll = async(req, res) => {
    const { page } = req.query
    const limit = 2
    const skip = Number(page - 1)*limit
    try {
        const todoGetAll = await todo.find().limit(limit).skip(skip)
        return res.status(200).json({
            success: true,
            data: todoGetAll
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "records cannot be gotten  "+ error
        })
    }
}

const todoAdd = async(req, res) => {
    console.log(req.body);
    try {
        const _todo = await todo.findOne({name: req.body.name})
        if(_todo) {
           return res.status(400).json({
            success: false,
            message: "this name is already registered"
           })
        }
        const todoAdd = new todo(req.body)

        await todoAdd.save()
        .then(() => {
            return res.status(201).json(todoAdd)
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                message: "an error was faced while recording : "+ err
            })
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "record was not formed!  "+ error
        })
    }
}

const todoDelete = async(req, res) => {
    try {
        const todoDelete = await todo.findByIdAndDelete(req.params.id)
        if(todoDelete) {
            return res.status(200).json({
                success: true,
                message: "deleted"
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "cannot be deleted"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "cannot be deleted! " + error
        })
    }
}


module.exports = {
    todoAdd, todoGetAll,todoUpdate,todoGetDetail,todoDelete
}