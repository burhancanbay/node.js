const express = require("express");
const User = require("../models/User");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email().min(6).max(255),
    password: Joi.string().required().min(6).max(255),
});

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

const router = express.Router();

router.get("/list", (req, res) => {
    User.find()
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.get("/list/:id", (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((err) => {
            res.json(err);
        });
});


router.post("/register", (req, res) => {
    const { error } = registerSchema.validate(req.body);
    if(error) { 
        res.status(400).send(error.details[0].message);
        return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const user = new User({name: req.body.name, email: req.body.email, password: hash});
    user.save()
        .then((user) => {
            const token = jwt.sign({_id: user._id}, process.env.JWT_CODE);
            res.header("Authorization", token).json({ accessToken: token });
        })
        .catch((err) => {
            res.json(err);
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate({ email, password});
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    User.findOne({email})
        .then((user) => {
            if(!user) {
                res.status(400).send("invalid email or password");
                return;
            }
            const isValid = bcrypt.compareSync(password, user.password);
            if(!isValid) {
                res.status(400).send("invalid email or password");
                return;
            }

            const token = jwt.sign({_id: user._id}, process.env.JWT_CODE);
            res.header("Authorization", token).json({ accessToken: token });
        })
        .catch((err) => {
            res.status(400).send("invalid email or password");
        });
});

module.exports = router;