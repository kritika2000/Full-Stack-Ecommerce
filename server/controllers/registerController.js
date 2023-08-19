const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const User = require("../model/Users");

const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password)
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    const foundUser = await User.findOne({ email: email }).exec();
    if(foundUser)
        return res.status(409).json({ success: false, message: "Email already in use" });
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPwd });
    return res.status(201).json({ success: true, message: "User Created Successfully!" })
}

module.exports = { handleNewUser };