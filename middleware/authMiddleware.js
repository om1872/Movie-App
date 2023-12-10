const jwt = require('jsonwebtoken');
const User = require('../database/User');
const JWT_SECRET = process.env.JWT_SECRET || 'my site secret 123';
const {ObjectId}=require('mongoose').Types;


const requiredAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(302).send({ msg: 'False Token , retry to Login', error: 1 });
            } else {
                next();
            }
        });
    } else {
        res.status(302).send({ msg: "Require Login", error: 1 });
    }
}


const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                const user = await User.findById(decodedToken.id);
                res.locals.user = { name: user.username, id: user._id.toString(), password: user.email, admin: user.admin };
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requiredAuth, checkUser };