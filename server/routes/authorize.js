const express = require('express');
const router = express.Router();
const { verifyJWT } = require('../middleware/verifyJWT');

router.get('/', verifyJWT, (req, res) => {
    res.json({ username: req.username, email: req.email })
});

module.exports = router;