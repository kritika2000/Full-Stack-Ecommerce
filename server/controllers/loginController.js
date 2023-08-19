const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/Users");

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.status(400).json({ success: false, message: "Invalid Credentials" });
    const foundUser = await User.findOne({ email: email }).exec();
    if(!foundUser)
        return res.status(401).json({ success: false, message: "User doesn't exist" });
    const match = await bcrypt.compare(password, foundUser.password);
    if(!match)
        return res.status(401).json({ success: false, message: "Invalid Credentials" });
    const accessToken = jwt.sign(
        { username: foundUser.username, email: foundUser.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    return res.json({ success: true, username: foundUser.username, email: foundUser.email, accessToken: accessToken, message: "Successfully Logged In" })
}

module.exports = { handleLogin };