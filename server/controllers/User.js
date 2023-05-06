const User = require('../models/User');

const getUserInfo = async (req, res) => {

    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};

const saveUserInfo = async (req, res) => {

    const {name, email} = req.body;

    if(name === "" || email === ""){
        return res.status(400).send("All fields are required!");
    }

    try {
        const create = await User.create(req.body);
        res.status(201).json(create);
    } catch (error) {
        res.status(400).json(error);
    }
};

module.exports = { getUserInfo, saveUserInfo };