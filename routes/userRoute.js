const express = require("express");
const User = require("../models/userModel");
const checkAuth = require("../middleware/checkAuth");
const { check, validationResult } = require("express-validator");
const userRouter = express.Router();

// Read user by ID
userRouter.get("/:id", checkAuth, (req, res) => {
    const { id } = req.params;

    User.findById({ _id: id }, (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.json(result);
        }
    });
});

// Update user by ID 
userRouter.put("/:id", check("email").isEmail(), (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    };
    
    const body = { email };

    User.findOneAndUpdate({ _id: id }, body, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200);
        };
    });
    res.send();
});

// Delete user by ID
userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await User.deleteOne({ _id: id });
    res.status(204).send();
});

module.exports = userRouter;